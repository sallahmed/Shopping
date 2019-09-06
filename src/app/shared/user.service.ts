import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import {Profil} from './profil.model';

@Injectable()
export class UserService {
  selectedUser: User;
  userList: User[];
  profil: Profil[];
  userPhoto: any = null;
  constructor(public appSettings: AppSettings, private http: HttpClient) { }

  registerUser(user: User) {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Access-Control-Allow-Origin','*');

    const body: User = {
      Id: user.Id,
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Mobile: user.Mobile,
      Fixe: user.Fixe,
      Matricule: user.Matricule,
      Profil: user.Profil,
      Avatar: this.userPhoto
    }

    // var reqHeader = new HttpHeaders({'Authorization' : 'True'});
    // Pour eviter l'erreur access-control-origin
    var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'});
    //  return this.http.post(this.appSettings.rootUrl + 'api/register', body);
    // ne nécessite pas d'authentification et envoie les données en json
    return this.http.post(this.appSettings.rootUrl + 'api/register', body, {headers : reqHeader});
  }

  userAuthentication(userName, password) {
      var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'True'});
      let body =  new HttpParams().set('_username', userName).set('_password', password);

    // return this.http.post(this.appSettings.rootUrl+'/api/login_check', data,{headers: reqHeader});
    return this.http.post(this.appSettings.rootUrl+'api/login_check', body.toString(), {headers: reqHeader});
    // return this.http.post(this.appSettings.rootUrl+'/api/login_check', data, options);
  }

  getUserClaims() {
    /*return this.http.get(this.appSettings.rootUrl + 'api/info_user', {headers: new HttpHeaders({'Authorization' : 'Bearer '
            + localStorage.getItem('userToken') })});*/
      // localStorage.setItem('currentUser', JSON.stringify(user));
      return this.http.get(this.appSettings.rootUrl + 'api/info_user');
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({'Authorization' : 'True'});
    // return this.http.get(this.appSettings.rootUrl + 'api/les_roles', { headers: reqHeader});
      return this.http.get(this.appSettings.rootUrl + 'api/les_roles');
  }

    getAllStructures() {
        var reqHeader = new HttpHeaders({'Authorization' : 'True'});
        return this.http.get(this.appSettings.rootUrl + 'api/les_structures');
    }

    /*
    getUserList() {
        return this.http.get(this.appSettings.rootUrl + 'api/utilisateurs')
            .map((data : Response) => {
              //return data.json() as User[];
              return data.json() as User[];
            }).toPromise().then(x => {
              this.userList = x;
            });
    }*/

    getUserList(): Promise<User[]> {
        return this.http.get(this.appSettings.rootUrl + 'api/utilisateurs')
            .map((data: User[]) => {
                return data as User[];
            }).toPromise().then(x => {
                this.userList = x;
                return this.userList;
            });
    }


}
