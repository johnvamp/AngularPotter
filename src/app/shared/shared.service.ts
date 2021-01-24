import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _shieldSource = new Subject<any>();
  shieldMembers$ = this._shieldSource.asObservable();

  constructor() { }

  sendMembers(data: any) {
    this._shieldSource.next(data);
  }
}
