import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { CrudService } from './crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends CrudService<any>{

  constructor(private config: AppConfigService, http: HttpClient) {
    super(config.contactUrl, http);
  }
}
