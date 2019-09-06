import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Entite, AnneesExercice, Capital, TypeControle, Reporting, Sunshine, TypeSunshine, PertesParEntite } from './reportings.model';
import { Domaine } from './../controles/list-controle/controle.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';

@Injectable()
export class ReportingsService {
    //readonly rootUrl = 'http://213.154.64.77/usersdir/mohamed/opera/web/app_dev.php/';
    //readonly rootUrl = 'http://localhost/opera/web/app_dev.php/';
    //readonly rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/app_dev.php/';
    //readonly rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/app_dev.php/';
    typeCA: any;
    selectedCapital: any;
    selectedSunshine: any;
    selectedTypeSunshine: any;
    constructor(public appSettings: AppSettings, public http: HttpClient) {}

    getListCapitals(): Observable<Capital[]> {
      return this.http.get<Capital[]>(this.appSettings.rootUrl + 'api/les_capitals');
    }

    getListTypeControles(): Observable<TypeControle[]> {
      return this.http.get<TypeControle[]>(this.appSettings.rootUrl + 'api/les_types_controles');
    }

    getListEntites(): Observable<Entite[]> {
      return this.http.get<Entite[]>(this.appSettings.rootUrl + 'api/les_entites');
    }

    getListAnneesExercice(): Observable<AnneesExercice[]> {
      return this.http.get<AnneesExercice[]>(this.appSettings.rootUrl + 'api/les_annees_exercice');
    }

    getTypeSunshines(): Observable<TypeSunshine[]> {
      return this.http.get<TypeSunshine[]>(this.appSettings.rootUrl + 'api/types_sunshines');
    }

    /*
    getCapitalsGroupe(domaine: Domaine, annee): Observable<Capital[]> {
      const data = {dom: String(domaine), an: String(annee)};
      return this.http.get<Capital[]>(this.appSettings.rootUrl + 'api/capitals_entite_domaine', {params: data});
    }
    */

    getCapitalsEntiteDomaine(entite: any, domaine: Domaine, annee): Observable<Capital[]> {
      const data = {en: String(entite), dom: String(domaine), an: String(annee)};
      return this.http.get<Capital[]>(this.appSettings.rootUrl + 'api/capitals_entite_domaine', {params: data});
    }

    getReportingsFinancierEntity(ent: any, year): Observable<Reporting[]> {
      const data = {en: String(ent), annee: String(year)};
      return this.http.get<Reporting[]>(this.appSettings.rootUrl + 'api/reportings_financier_entite', {params: data});
    }

    getReportingsFinancierGroupe(year): Observable<Reporting[]> {
      const data = {annee: String(year)};
      return this.http.get<Reporting[]>(this.appSettings.rootUrl + 'api/reportings_financier_groupe', {params: data});
    }

    getPertesParEntite(year): Observable<any[]> {
      const data = {annee: String(year)};
      return this.http.get<PertesParEntite[]>(this.appSettings.rootUrl + 'api/pertes_par_entite', {params: data});
    }

    getPertesSauvesParEntite(ent: any, year): Observable<PertesParEntite[]> {
      const data = {en: String(ent), annee: String(year)};
      return this.http.get<PertesParEntite[]>(this.appSettings.rootUrl + 'api/pertes_sauves_par_entite', {params: data});
    }

    saisieSunshine(sunshine: Sunshine) {
      return this.http.put(this.appSettings.rootUrl + 'api/saisie_sunshine', sunshine);
    }

    saisieCapital(capital: Capital) {
      return this.http.put(this.appSettings.rootUrl + 'api/saisie_capital', capital);
    }

    saisieTypeSunshine(typeSunshine: TypeSunshine) {
      return this.http.put(this.appSettings.rootUrl + 'api/saisie_type_sunshine', typeSunshine);
    }
}
