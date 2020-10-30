import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class HotelsService extends CrudService {
  endpoint = 'hotels';

  constructor(http: HttpClient) {
    super(http);
  }


}
