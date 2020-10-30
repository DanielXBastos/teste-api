import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsService extends CrudService {
  endpoint = 'flights';

  constructor(http: HttpClient) {
    super(http);
  }


}
