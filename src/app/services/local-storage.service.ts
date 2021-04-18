import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem(name) {
    return localStorage.getItem(name)
  }

  removeItem(item): void {
    localStorage.removeItem(item)
  }

  constructor() { }
}
