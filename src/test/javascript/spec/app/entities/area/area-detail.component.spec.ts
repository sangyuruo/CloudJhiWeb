/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AreaDetailComponent } from '../../../../../../main/webapp/app/entities/area/area-detail.component';
import { AreaService } from '../../../../../../main/webapp/app/entities/area/area.service';
import { Area } from '../../../../../../main/webapp/app/entities/area/area.model';

describe('Component Tests', () => {

    describe('Area Management Detail Component', () => {
        let comp: AreaDetailComponent;
        let fixture: ComponentFixture<AreaDetailComponent>;
        let service: AreaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [AreaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AreaService,
                    JhiEventManager
                ]
            }).overrideTemplate(AreaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Area(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.area).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
