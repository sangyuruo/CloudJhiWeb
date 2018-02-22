/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.emcloud.web.security;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;


public final class MyCsrfFilter extends OncePerRequestFilter {
    /**
     * The default {@link RequestMatcher} that indicates if CSRF protection is required or
     * not. The default is to ignore GET, HEAD, TRACE, OPTIONS and process all other
     * requests.
     */
    public static final RequestMatcher DEFAULT_CSRF_MATCHER = new DefaultRequiresCsrfMatcher();

    private final Log logger = LogFactory.getLog(getClass());
    private final CsrfTokenRepository tokenRepository;
    private RequestMatcher requireCsrfProtectionMatcher = DEFAULT_CSRF_MATCHER;
    private AccessDeniedHandler accessDeniedHandler = new AccessDeniedHandlerImpl();

    public MyCsrfFilter(CsrfTokenRepository csrfTokenRepository) {
        Assert.notNull(csrfTokenRepository, "csrfTokenRepository cannot be null");
        this.tokenRepository = csrfTokenRepository;
    }

    /*
     * (non-Javadoc)
     *
     * @see
     * org.springframework.web.filter.OncePerRequestFilter#doFilterInternal(javax.servlet
     * .http.HttpServletRequest, javax.servlet.http.HttpServletResponse,
     * javax.servlet.FilterChain)
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        request.setAttribute(HttpServletResponse.class.getName(), response);

        CsrfToken csrfToken = this.tokenRepository.loadToken(request);
        final boolean missingToken = csrfToken == null;
        if (missingToken) {
            csrfToken = this.tokenRepository.generateToken(request);
            this.tokenRepository.saveToken(csrfToken, request, response);
        }
        request.setAttribute(CsrfToken.class.getName(), csrfToken);
        request.setAttribute(csrfToken.getParameterName(), csrfToken);

        if (!this.requireCsrfProtectionMatcher.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String actualToken = request.getHeader(csrfToken.getHeaderName());
        if (actualToken == null) {
            actualToken = request.getParameter(csrfToken.getParameterName());
        }
        if (actualToken == null) {
            actualToken = this.getTokenFromRequestHeaderCookie(request,csrfToken);
        }

        if (!csrfToken.getToken().equals(actualToken)) {
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Invalid CSRF token found for "
                    + UrlUtils.buildFullRequestUrl(request));
            }
            if (missingToken) {
                this.accessDeniedHandler.handle(request, response,
                    new MissingCsrfTokenException(actualToken));
            }
            else {
                this.accessDeniedHandler.handle(request, response,
                    new InvalidCsrfTokenException(csrfToken, actualToken));
            }
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequestHeaderCookie(HttpServletRequest request, CsrfToken csrfToken) {
        String tokenValue = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie: cookies ){
            if( cookie.getName().equals(csrfToken.getHeaderName())){
                tokenValue = cookie.getValue();
                break;
            }
        }
        return tokenValue;
    }

    /**
     * Specifies a {@link RequestMatcher} that is used to determine if CSRF protection
     * should be applied. If the {@link RequestMatcher} returns true for a given request,
     * then CSRF protection is applied.
     *
     * <p>
     * The default is to apply CSRF protection for any HTTP method other than GET, HEAD,
     * TRACE, OPTIONS.
     * </p>
     *
     * @param requireCsrfProtectionMatcher the {@link RequestMatcher} used to determine if
     * CSRF protection should be applied.
     */
    public void setRequireCsrfProtectionMatcher(
        RequestMatcher requireCsrfProtectionMatcher) {
        Assert.notNull(requireCsrfProtectionMatcher,
            "requireCsrfProtectionMatcher cannot be null");
        this.requireCsrfProtectionMatcher = requireCsrfProtectionMatcher;
    }

    /**
     * Specifies a {@link AccessDeniedHandler} that should be used when CSRF protection
     * fails.
     *
     * <p>
     * The default is to use AccessDeniedHandlerImpl with no arguments.
     * </p>
     *
     * @param accessDeniedHandler the {@link AccessDeniedHandler} to use
     */
    public void setAccessDeniedHandler(AccessDeniedHandler accessDeniedHandler) {
        Assert.notNull(accessDeniedHandler, "accessDeniedHandler cannot be null");
        this.accessDeniedHandler = accessDeniedHandler;
    }

    private static final class DefaultRequiresCsrfMatcher implements RequestMatcher {
        private final HashSet<String> allowedMethods = new HashSet<String>(
            Arrays.asList("GET", "HEAD", "TRACE", "OPTIONS"));

        /*
         * (non-Javadoc)
         *
         * @see
         * org.springframework.security.web.util.matcher.RequestMatcher#matches(javax.
         * servlet.http.HttpServletRequest)
         */
        @Override
        public boolean matches(HttpServletRequest request) {
            return !this.allowedMethods.contains(request.getMethod());
        }
    }
}
