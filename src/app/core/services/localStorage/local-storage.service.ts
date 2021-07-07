import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }

  removeLocalStorageValue(key: string) {
    localStorage.removeItem(key);
  }

}
