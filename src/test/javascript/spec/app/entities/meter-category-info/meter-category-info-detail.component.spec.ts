/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MeterCategoryInfoDetailComponent } from '../../../../../../main/webapp/app/entities/meter-category-info/meter-category-info-detail.component';
import { MeterCategoryInfoService } from '../../../../../../main/webapp/app/entities/meter-category-info/meter-category-info.service';
import { MeterCategoryInfo } from '../../../../../../main/webapp/app/entities/meter-category-info/meter-category-info.model';

describe('Component Tests', () => {

    describe('MeterCategoryInfo Management Detail Component', () => {
        let comp: MeterCategoryInfoDetailComponent;
        let fixture: ComponentFixture<MeterCategoryInfoDetailComponent>;
        let service: MeterCategoryInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [MeterCategoryInfoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MeterCategoryInfoService,
                    JhiEventManager
                ]
            }).overrideTemplate(MeterCategoryInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeterCategoryInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterCategoryInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MeterCategoryInfo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.meterCategoryInfo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
