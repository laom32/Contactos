import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  get locationsUrl(): string {
    return `${this.injector.get('BASE_URL')}Locations`;
  }
  get contactUrl(): string {
    return `${this.injector.get('BASE_URL')}Contact`;
  }
  constructor(private injector: Injector) { }
}
