import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  _notificationUpload = new EventEmitter<any>();

  constructor() { }

  get notificationUpload(): EventEmitter<any>{
    return this._notificationUpload;
  }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }
}
