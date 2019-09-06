import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserProfile, TypeStructure, Structure } from './user.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class UsersService {
    userList: User[];
    //readonly rootUrl = 'http://213.154.64.77/usersdir/mohamed/opera/web/app_dev.php/';
    //readonly rootUrl = 'http://localhost/opera/web/app_dev.php/';
    //readonly rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/app_dev.php/';
    //readonly rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/app_dev.php/';
    public url = 'api/users';
    userPhoto: any = null;
    Photo: File = null;
    constructor(public http: HttpClient,  public appSettings: AppSettings) { }

    userAuthentication(userName, password) {
        var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'True'});
        let body =  new HttpParams().set('_username', userName).set('_password', password);
        return this.http.post(this.appSettings.rootUrl + 'api/login_check', body.toString(), {headers: reqHeader});
    }

    getUsers(): Observable<User[]> {
        // return this.http.get<User[]>(this.url);
        return this.http.get<User[]>(this.appSettings.rootUrl + 'api/utilisateurs');
    }

    addUser(user:User){
        // return this.http.post(this.url, user);
        return this.http.put(this.appSettings.rootUrl + 'api/register', user);
    }

    updateUser(user:User){
        // return this.http.put(this.url, user);
        return this.http.put(this.appSettings.rootUrl + 'api/update', user);
    }

    updateProfil(user:User){
        // return this.http.put(this.url, user);
        return this.http.put(this.appSettings.rootUrl + 'api/update_profil', user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    }

    getUserClaims() {
        return this.http.get(this.appSettings.rootUrl + 'api/info_user');
    }

    getListeUtilisateurs(): Observable<User[]> {
        // var reqHeader = new HttpHeaders({'Authorization' : 'True'});
        return this.http.get<User[]>(this.appSettings.rootUrl + 'api/utilisateurs');
    }

    getListeTypesStructures(): Observable<TypeStructure[]> {
        return this.http.get<TypeStructure[]>(this.appSettings.rootUrl + 'api/les_types_structures');
    }

    getAllRoles(): Observable<UserProfile[]> {
        var reqHeader = new HttpHeaders({'Authorization' : 'True'});
        return this.http.get<UserProfile[]>(this.appSettings.rootUrl + 'api/les_roles');
    }

    getAllStructures(): Observable<Structure[]> {
        var reqHeader = new HttpHeaders({'Authorization' : 'True'});
        return this.http.get<Structure[]>(this.appSettings.rootUrl + 'api/les_structures');
    }

    changePassword(data){
        var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'True'});
        return this.http.put(`${this.appSettings.rootUrl}api/change_password`, data,  {headers: reqHeader});
    }

    resetPassword(data){
        var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'True'});
        //var reqHeader = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
        //reqHeader.set('Authorization', `Bearer ${data.token}`);
        //let body =  new HttpParams().set('_plainpassword', data.password).set('token', data.token);
        let dt = {token: data.token, password: data.password};
        return this.http.get(`${this.appSettings.rootUrl}api/reset_password`,  {headers: reqHeader, params: dt});
        //return this.http.get(`${this.appSettings.rootUrl}api/reset_password`, data,  {headers: reqHeader});
        //return this.http.post(`${this.appSettings.rootUrl}resetting/reset`, data,  {headers: reqHeader});
    }

}
