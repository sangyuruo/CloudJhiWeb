import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Address } from './address.model';
import { AddressService } from './address.service';

@Injectable()
export class AddressPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private addressService: AddressService

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
                this.addressService.find(id).subscribe((address) => {
                    address.createTime = this.datePipe
                        .transform(address.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    address.updateTime = this.datePipe
                        .transform(address.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.addressModalRef(component, address);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.addressModalRef(component, new Address());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    addressModalRef(component: Component, address: Address): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.address = address;
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
