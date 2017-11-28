/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CompointDetailComponent } from '../../../../../../main/webapp/app/entities/compoint/compoint-detail.component';
import { CompointService } from '../../../../../../main/webapp/app/entities/compoint/compoint.service';
import { Compoint } from '../../../../../../main/webapp/app/entities/compoint/compoint.model';

describe('Component Tests', () => {

    describe('Compoint Management Detail Component', () => {
        let comp: CompointDetailComponent;
        let fixture: ComponentFixture<CompointDetailComponent>;
        let service: CompointService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [CompointDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CompointService,
                    JhiEventManager
                ]
            }).overrideTemplate(CompointDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompointDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompointService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Compoint(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.compoint).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
