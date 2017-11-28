/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MeterInfoDetailComponent } from '../../../../../../main/webapp/app/entities/meter-info/meter-info-detail.component';
import { MeterInfoService } from '../../../../../../main/webapp/app/entities/meter-info/meter-info.service';
import { MeterInfo } from '../../../../../../main/webapp/app/entities/meter-info/meter-info.model';

describe('Component Tests', () => {

    describe('MeterInfo Management Detail Component', () => {
        let comp: MeterInfoDetailComponent;
        let fixture: ComponentFixture<MeterInfoDetailComponent>;
        let service: MeterInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [MeterInfoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MeterInfoService,
                    JhiEventManager
                ]
            }).overrideTemplate(MeterInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeterInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MeterInfo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.meterInfo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
