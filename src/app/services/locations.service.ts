import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { CrudService } from './crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService extends CrudService<any> {

  constructor(private config: AppConfigService, http: HttpClient) {
    super(config.locationsUrl, http);
  }
  getLocations(lugar: string) {
    let url = `${this.endpoint}?location=${lugar}`;
    return this.http.get<any>(url);
  }
}
