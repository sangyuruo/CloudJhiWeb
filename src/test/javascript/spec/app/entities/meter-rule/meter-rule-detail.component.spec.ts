/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MeterRuleDetailComponent } from '../../../../../../main/webapp/app/entities/meter-rule/meter-rule-detail.component';
import { MeterRuleService } from '../../../../../../main/webapp/app/entities/meter-rule/meter-rule.service';
import { MeterRule } from '../../../../../../main/webapp/app/entities/meter-rule/meter-rule.model';

describe('Component Tests', () => {

    describe('MeterRule Management Detail Component', () => {
        let comp: MeterRuleDetailComponent;
        let fixture: ComponentFixture<MeterRuleDetailComponent>;
        let service: MeterRuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [MeterRuleDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MeterRuleService,
                    JhiEventManager
                ]
            }).overrideTemplate(MeterRuleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeterRuleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterRuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MeterRule(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.meterRule).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
