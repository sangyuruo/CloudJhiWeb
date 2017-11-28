import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Organization } from './organization.model';
import { OrganizationPopupService } from './organization-popup.service';
import { OrganizationService } from './organization.service';
import { Company, CompanyService } from '../company';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-organization-dialog',
    templateUrl: './organization-dialog.component.html'
})
export class OrganizationDialogComponent implements OnInit {

    organization: Organization;
    isSaving: boolean;

    companies: Company[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private organizationService: OrganizationService,
        private companyService: CompanyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.companyService
            .query({filter: 'organization-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.organization.company || !this.organization.company.id) {
                    this.companies = res.json;
                } else {
                    this.companyService
                        .find(this.organization.company.id)
                        .subscribe((subRes: Company) => {
                            this.companies = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organization.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organizationService.update(this.organization));
        } else {
            this.subscribeToSaveResponse(
                this.organizationService.create(this.organization));
        }
    }

    private subscribeToSaveResponse(result: Observable<Organization>) {
        result.subscribe((res: Organization) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Organization) {
        this.eventManager.broadcast({ name: 'organizationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-organization-popup',
    template: ''
})
export class OrganizationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizationPopupService: OrganizationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organizationPopupService
                    .open(OrganizationDialogComponent as Component, params['id']);
            } else {
                this.organizationPopupService
                    .open(OrganizationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
