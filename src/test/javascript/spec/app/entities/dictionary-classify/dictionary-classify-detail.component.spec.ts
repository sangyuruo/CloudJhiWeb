/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DictionaryClassifyDetailComponent } from '../../../../../../main/webapp/app/entities/dictionary-classify/dictionary-classify-detail.component';
import { DictionaryClassifyService } from '../../../../../../main/webapp/app/entities/dictionary-classify/dictionary-classify.service';
import { DictionaryClassify } from '../../../../../../main/webapp/app/entities/dictionary-classify/dictionary-classify.model';

describe('Component Tests', () => {

    describe('DictionaryClassify Management Detail Component', () => {
        let comp: DictionaryClassifyDetailComponent;
        let fixture: ComponentFixture<DictionaryClassifyDetailComponent>;
        let service: DictionaryClassifyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [DictionaryClassifyDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DictionaryClassifyService,
                    JhiEventManager
                ]
            }).overrideTemplate(DictionaryClassifyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictionaryClassifyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryClassifyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DictionaryClassify(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dictionaryClassify).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
