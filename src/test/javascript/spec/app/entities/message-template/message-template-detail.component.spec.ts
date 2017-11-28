/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EmCloudWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MessageTemplateDetailComponent } from '../../../../../../main/webapp/app/entities/message-template/message-template-detail.component';
import { MessageTemplateService } from '../../../../../../main/webapp/app/entities/message-template/message-template.service';
import { MessageTemplate } from '../../../../../../main/webapp/app/entities/message-template/message-template.model';

describe('Component Tests', () => {

    describe('MessageTemplate Management Detail Component', () => {
        let comp: MessageTemplateDetailComponent;
        let fixture: ComponentFixture<MessageTemplateDetailComponent>;
        let service: MessageTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmCloudWebTestModule],
                declarations: [MessageTemplateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MessageTemplateService,
                    JhiEventManager
                ]
            }).overrideTemplate(MessageTemplateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageTemplateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MessageTemplate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.messageTemplate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
