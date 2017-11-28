/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DictionaryDetailComponent } from '../../../../../../main/webapp/app/entities/dictionary/dictionary-detail.component';
import { DictionaryService } from '../../../../../../main/webapp/app/entities/dictionary/dictionary.service';
import { Dictionary } from '../../../../../../main/webapp/app/entities/dictionary/dictionary.model';

describe('Component Tests', () => {

    describe('Dictionary Management Detail Component', () => {
        let comp: DictionaryDetailComponent;
        let fixture: ComponentFixture<DictionaryDetailComponent>;
        let service: DictionaryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [DictionaryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DictionaryService,
                    JhiEventManager
                ]
            }).overrideTemplate(DictionaryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictionaryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dictionary(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dictionary).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
