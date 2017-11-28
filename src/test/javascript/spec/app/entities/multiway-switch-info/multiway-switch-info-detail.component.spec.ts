/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MultiwaySwitchInfoDetailComponent } from '../../../../../../main/webapp/app/entities/multiway-switch-info/multiway-switch-info-detail.component';
import { MultiwaySwitchInfoService } from '../../../../../../main/webapp/app/entities/multiway-switch-info/multiway-switch-info.service';
import { MultiwaySwitchInfo } from '../../../../../../main/webapp/app/entities/multiway-switch-info/multiway-switch-info.model';

describe('Component Tests', () => {

    describe('MultiwaySwitchInfo Management Detail Component', () => {
        let comp: MultiwaySwitchInfoDetailComponent;
        let fixture: ComponentFixture<MultiwaySwitchInfoDetailComponent>;
        let service: MultiwaySwitchInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [MultiwaySwitchInfoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MultiwaySwitchInfoService,
                    JhiEventManager
                ]
            }).overrideTemplate(MultiwaySwitchInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MultiwaySwitchInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MultiwaySwitchInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MultiwaySwitchInfo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.multiwaySwitchInfo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
