import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class IataCodesService extends CrudService {
  endpoint = 'iataCodes';

  constructor(http: HttpClient) {
    super(http);
  }


}
