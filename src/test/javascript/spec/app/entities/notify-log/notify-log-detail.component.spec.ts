/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NotifyLogDetailComponent } from '../../../../../../main/webapp/app/entities/notify-log/notify-log-detail.component';
import { NotifyLogService } from '../../../../../../main/webapp/app/entities/notify-log/notify-log.service';
import { NotifyLog } from '../../../../../../main/webapp/app/entities/notify-log/notify-log.model';

describe('Component Tests', () => {

    describe('NotifyLog Management Detail Component', () => {
        let comp: NotifyLogDetailComponent;
        let fixture: ComponentFixture<NotifyLogDetailComponent>;
        let service: NotifyLogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [NotifyLogDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NotifyLogService,
                    JhiEventManager
                ]
            }).overrideTemplate(NotifyLogDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotifyLogDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotifyLogService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new NotifyLog(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.notifyLog).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
