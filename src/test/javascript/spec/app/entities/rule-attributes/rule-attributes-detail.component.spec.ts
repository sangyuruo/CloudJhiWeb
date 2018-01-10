/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RuleAttributesDetailComponent } from '../../../../../../main/webapp/app/entities/rule-attributes/rule-attributes-detail.component';
import { RuleAttributesService } from '../../../../../../main/webapp/app/entities/rule-attributes/rule-attributes.service';
import { RuleAttributes } from '../../../../../../main/webapp/app/entities/rule-attributes/rule-attributes.model';

describe('Component Tests', () => {

    describe('RuleAttributes Management Detail Component', () => {
        let comp: RuleAttributesDetailComponent;
        let fixture: ComponentFixture<RuleAttributesDetailComponent>;
        let service: RuleAttributesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [RuleAttributesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RuleAttributesService,
                    JhiEventManager
                ]
            }).overrideTemplate(RuleAttributesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RuleAttributesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RuleAttributesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RuleAttributes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ruleAttributes).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
