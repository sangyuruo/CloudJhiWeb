import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { NotifyLog } from './notify-log.model';
import { NotifyLogService } from './notify-log.service';

@Component({
    selector: 'jhi-notify-log-detail',
    templateUrl: './notify-log-detail.component.html'
})
export class NotifyLogDetailComponent implements OnInit, OnDestroy {

    notifyLog: NotifyLog;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notifyLogService: NotifyLogService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotifyLogs();
    }

    load(id) {
        this.notifyLogService.find(id).subscribe((notifyLog) => {
            this.notifyLog = notifyLog;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotifyLogs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notifyLogListModification',
            (response) => this.load(this.notifyLog.id)
        );
    }
}
