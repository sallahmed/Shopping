import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {Controle, TypeControle, TypeTrafic, Entite, MethodeControle, Activite, Flux, Dysfonctionnement, PertesParTypologie } from './controle.model';
import {  CouvertureControle, Outil, Periodicite, Domaine, Suivi, Statistique, TypologiePerte } from './controle.model';
import { Observable } from 'rxjs/Observable';
import {TypeStructure, User} from '../../users/user.model';
import { AppSettings } from '../../../app.settings';

@Injectable()
export class ControlesService {
    // readonly rootUrl = 'http://213.154.64.77/usersdir/mohamed/opera/web/app_dev.php/';
    // readonly rootUrl = 'http://localhost/opera/web/app_dev.php/';
    // readonly rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/app_dev.php/';
    // readonly rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/app_dev.php/';
    selectedControle: Controle;
    selectedControleFiliale: any;
    selectedDysfonctionnement: Dysfonctionnement;
    selectedSuivi: Suivi;

    constructor(public http: HttpClient, public appSettings: AppSettings) {}

    getListTypesControles(): Observable<TypeControle[]> {
        return this.http.get<TypeControle[]>(this.appSettings.rootUrl + 'api/les_types_controles');
    }

    getNewControles(): Observable<Controle[]> {
        return this.http.get<Controle[]>(this.appSettings.rootUrl + 'api/les_nouveaux_controles');
    }

    addControle(controle: Controle) {
        return this.http.put(this.appSettings.rootUrl + 'api/ajouter_controle', controle);
    }

    editStateControle(data: any) {
        return this.http.put(this.appSettings.rootUrl + 'api/edit_state_controle', data);
    }

    editPorteurControle(data: any) {
        return this.http.put(this.appSettings.rootUrl + 'api/edit_porteur_controle', data);
    }

    reconduire(data: any) {
        return this.http.put(this.appSettings.rootUrl + 'api/reconduire_controle', data);
    }

    addDysfonctionnement(dysfonctionnement: Dysfonctionnement) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_dysfonctionnement', dysfonctionnement);
    }
    changeStatutDysfonctionnement(data: any) {
        return this.http.put(this.appSettings.rootUrl + 'api/change_statut_dysfonctionnement', data);
    }

    addModele(data: any) {
        return this.http.put(this.appSettings.rootUrl + 'api/add_modele', data);
    }

    deleteControle(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_controle/' + id);
    }

    getControleById(id) {
        return this.http.get(this.appSettings.rootUrl + 'api/controle/' + id);
    }

    getControleFilialeById(id) {
        return this.http.get(this.appSettings.rootUrl + 'api/controle_filiale/' + id);
    }

    saisieSuivi(suivi: Suivi) {
        return this.http.put(this.appSettings.rootUrl + 'api/saisie_suivi', suivi);
    }

    getListTypesTrafics(): Observable<TypeTrafic[]> {
        return this.http.get<TypeTrafic[]>(this.appSettings.rootUrl + 'api/les_types_trafics');
    }

    getListActivites(): Observable<Activite[]> {
        return this.http.get<Activite[]>(this.appSettings.rootUrl + 'api/les_activites');
    }

    getListFlux(): Observable<Flux[]> {
        return this.http.get<Flux[]>(this.appSettings.rootUrl + 'api/les_flux');
    }

    getListDomaines(): Observable<Domaine[]> {
        return this.http.get<Domaine[]>(this.appSettings.rootUrl + 'api/les_domaines');
    }

    getListPorteurs(): Observable<User[]> {
        return this.http.get<User[]>(this.appSettings.rootUrl + 'api/porteurs');
    }

    getPorteursByEntite(entiteId): Observable<Entite[]> {
        const data = {entiteId: String(entiteId)};
        return this.http.get<Entite[]>(this.appSettings.rootUrl + 'api/porteurs_by_entite', {params: data});
    }

    getListEntites(): Observable<Entite[]> {
        return this.http.get<Entite[]>(this.appSettings.rootUrl + 'api/les_entites');
    }

    addEntite(entite: Entite) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_entite', entite);
    }

    deleteEntite(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_entite/' + id);
    }

    addTypeStructure(type: TypeStructure) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_type_structure', type);
    }

    deleteTypeStructure(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_type_structure/' + id);
    }

    addPeriodicite(periodicite: Periodicite) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_periodicite', periodicite);
    }

    deletePeriodicite(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_periodicite/' + id);
    }

    addTypeTrafic(type: TypeTrafic) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_type_trafic', type);
    }

    deleteTypeTrafic(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_type_trafic/' + id);
    }

    addMethodeControle(methode: MethodeControle) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_methode_controle', methode);
    }

    deleteMethodeControle(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_methode_controle/' + id);
    }

    addTypeControle(type: TypeControle) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_type_controle', type);
    }

    deleteTypeControle(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_type_controle/' + id);
    }

    addActivite(activite: Activite) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_activite', activite);
    }

    deleteActivite(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_activite/' + id);
    }

    addFlux(flux: Flux) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_flux', flux);
    }

    deleteFlux(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_flux/' + id);
    }

    addDomaine(domaine: Domaine) {
        return this.http.put(this.appSettings.rootUrl + 'api/new_domaine', domaine);
    }

    deleteDomaine(id) {
        return this.http.delete(this.appSettings.rootUrl + 'api/supprimer_domaine/' + id);
    }

    getFilialesDispo(controleId): Observable<Entite[]> {
        const data = {controleId: String(controleId)};
        return this.http.get<Entite[]>(this.appSettings.rootUrl + 'api/les_filiales_dispo', {params: data});
    }

    getListPeriodicites(): Observable<Periodicite[]> {
        return this.http.get<Periodicite[]>(this.appSettings.rootUrl + 'api/les_periodicites');
    }

    getListMethodesControles(): Observable<MethodeControle[]> {
        return this.http.get<MethodeControle[]>(this.appSettings.rootUrl + 'api/les_methodes_controles');
    }

    getListOutil(): Observable<Outil[]> {
        return this.http.get<Outil[]>(this.appSettings.rootUrl + 'api/les_outils');
    }

    getListCouvertuesControles(): Observable<CouvertureControle[]> {
        return this.http.get<CouvertureControle[]>(this.appSettings.rootUrl + 'api/les_couvertures_controles');
    }

    getListeControles(): Observable<Controle[]> {
        return this.http.get<Controle[]>(this.appSettings.rootUrl + 'api/les_controles');
    }

    getTypologiePertes(): Observable<TypologiePerte[]> {
        return this.http.get<TypologiePerte[]>(this.appSettings.rootUrl + 'api/les_typologies_pertes');
    }

    getPertesParTypologie(entite, year): Observable<PertesParTypologie[]> {
        const data = {en: String(entite), annee: String(year)};
        return this.http.get<PertesParTypologie[]>(this.appSettings.rootUrl + 'api/pertes_par_typologie', {params: data});
    }

    getUserControles(): Observable<Controle[]> {
        return this.http.get<Controle[]>(this.appSettings.rootUrl + 'api/mes_controles');
    }

    getStatsForCompliance(stat: Statistique): Observable<Statistique[]> {
        let data = null;
        if (stat) {
            data = {
                tc: String(stat.type_controle.id),
                dm: String(stat.domaine.id),
                en: String(stat.entite.id),
                pr: String(stat.porteur.id),
                dd: String(stat.date_debut),
                df: String(stat.date_fin)
            };
        }
        // let data = JSON.stringify(stat);
        return this.http.get<Statistique[]>(this.appSettings.rootUrl + 'api/find_stats_compliance', {params: data});
    }

    getPertesSauvesCA(idEntiteUser): Observable<any[]> {
        const data = {en: String(idEntiteUser)};
        return this.http.get<any[]>(this.appSettings.rootUrl + 'api/pertes_sauves_ca', {params: data});
    }

    getDataCompliance(stat): Observable<any[]> {
        let data = null;
        if (stat) {
            data = {
                tc: String(stat.type_controle.id),
                dm: String(stat.domaine.id),
                en: String(stat.entite.id),
                pr: String(stat.porteur.id)
            };
        }
        return this.http.get<any[]>(this.appSettings.rootUrl + 'api/stats_compliance', {params: data});
    }

    getDataSynthese(obj): Observable<any[]> {
        let data = null;
        if (obj) {
            data = {
                entite: String(obj.entite.id),
                annee: String(obj.annee)
            };
        }
        return this.http.get<any[]>(this.appSettings.rootUrl + 'api/stats_synthese', {params: data});
    }

    getDataDiffusion(obj): Observable<any[]> {
        let data = null;
        if (obj) {
            data = {
                entite: obj.entite.id,
                periode: obj.periodicite.id,
                annee: obj.year.annee
            };
        }
        return this.http.get<any[]>(this.appSettings.rootUrl + 'api/stats_diffusion', {params: data});
    }

    getDataDiffusionAnnuelle(obj): Observable<any[]> {
        let data = null;
        if (obj) {
            data = {
                entite: obj.entite.id,
                annee: obj.year.annee
            };
        }
        return this.http.get<any[]>(this.appSettings.rootUrl + 'api/stats_diffusion_annuelle', {params: data});
    }

    getCapitalsEntites() {
        return this.http.get(this.appSettings.rootUrl + 'api/capitals_entites');
    }

    genererFichier(data) {
        let donnees = null;
        donnees =  {
            periodicite: String(data.periodicite.id),
            controle: String(data.controle.id),
            annee: String(data.annee)
        };
        // return this.http.post(this.appSettings.rootUrl + 'api/generer_fichier', data);
        return this.http.get(this.appSettings.rootUrl + 'api/generer_fichier', {params: donnees});
    }

    chargerFichier(data) {
        return this.http.put(this.appSettings.rootUrl + 'api/charger_fichier', data);
    }
}
