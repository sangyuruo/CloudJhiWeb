import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dictionary } from './dictionary.model';
import { DictionaryService } from './dictionary.service';

@Injectable()
export class DictionaryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dictionaryService: DictionaryService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dictionaryService.find(id).subscribe((dictionary) => {
                    dictionary.startTime = this.datePipe
                        .transform(dictionary.startTime, 'yyyy-MM-ddTHH:mm:ss');
                    dictionary.endTime = this.datePipe
                        .transform(dictionary.endTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dictionaryModalRef(component, dictionary);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dictionaryModalRef(component, new Dictionary());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dictionaryModalRef(component: Component, dictionary: Dictionary): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dictionary = dictionary;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
