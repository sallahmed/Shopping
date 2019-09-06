import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Suivi} from '../../controles/list-controle/controle.model';
import { AppSettings } from '../../../app.settings';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoService {

  private _todoList = [
    { text: 'Check me out' },
    { text: 'Curabitur dignissim nunc a tellus euismod, quis pretium ipsum convallis'},
    { text: 'Vivamus dapibus pulvinar ipsum, sit amet elementum sapien tincidunt non'},
    { text: 'Praesent viverra nisl a pharetra viverra'},
    { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
    { text: 'Ex has semper alterum, expetenda dignissim' },
    { text: 'Nulla nisl urna, lobortis in leo vel, porta faucibus nulla'},
    { text: 'Simul erroribus ad usu' }
  ];

  constructor(private http: HttpClient, public appSettings: AppSettings) { }

  getTodoList() {
    return this._todoList;
  }

  getSuivisOfDay(): Observable<Suivi[]> {
      return this.http.get<Suivi[]>(this.appSettings.rootUrl + 'api/les_suivis_du_jour');
  }
}
