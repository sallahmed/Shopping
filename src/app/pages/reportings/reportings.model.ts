import {User} from '../users/user.model';

export class Controle {
    id: number;
    reference: string;
    libelle: string;
    maturite: string;
    priorite: string;
    risque_identifie: string;
    qualification_risque: string;
    description: string;
    date_demarrage: Date;
    type_controle: TypeControle;
    domaine: Domaine;
    porteur: User;
    type_trafic: TypeTrafic;
    entite: Entite;
    periodicite: Periodicite;
    methode_controle: MethodeControle;
    outil: Outil;
    couverture_controle: CouvertureControle;
    objectif_controle: ObjectifControle;
    //template: any|string;
    activite: Activite;
    flux: Flux;
    sous_domaine: Domaine;
    template: Document;
}

export class Document {
    id: number;
    filename: string;
    filetype: string;
    value: number;
    blob: Blob;
}

export class Sunshine {
    id: number;
    entite: Entite;
    mois: number;
    annee: number;
    valeur: number;
    date_debut: string;
    date_fin: string;
    commentaire: string;
    date_saisi: Date;
    last_motif: Date;
    type_sunshine: TypeSunshine;
}

export class TypeSunshine {
    id: number;
    code: string;
    libelle: string;
    description: string;
    sunshine: Array<Sunshine>;
}

export class TypeControle {
    id: number;
    libelle: string;
    code: string;
    controle: Array<Controle>;
}

export class Activite {
    id: number;
    libelle: string;
    code: string;
}

export class Flux {
    id: number;
    libelle: string;
    code: string;
}

export class Domaine {
    id: number;
    libelle: string;
    code: string;
    controle: Array<Controle>;
}

export class TypeTrafic {
    id: number;
    libelle: string;
    code: string;
    controle: Array<Controle>;
}

export class Entite {
    id: number;
    libelle: string;
    code: string;
    controle: Array<Controle>;
    sunshine: Array<Sunshine>;
}

export class Capital {
    id: number;
    ca_global: string;
    entite: Entite;
    domaine: Domaine;
    annee: string;
    mois: string;
}

export class AnneesExercice {
    annee: string;
}

export class Periodicite {
    id: number;
    libelle: string;
    valeur: number;
    code: string;
    controle: Array<Controle>;
}

export class MethodeControle {
    id: number;
    libelle: string;
    code: string;
    controle: Array<Controle>;
}

export class Outil {
    id: number;
    libelle: string;
    controle: Array<Controle>;
}

export class CouvertureControle {
    id: number;
    libelle: string;
    code: string;
    controle: Array<Controle>;
}

export class ObjectifControle{
    id: number;
    annee: number;
    suivi: Suivi;
}

export class Suivi {
    id: number;
    //Champs Camel
    date_saisie: Date;
    total_hlr: number;
    nbre_not_camel: number;
    nbre_imsi_prepaid: number;
    vlm_ecat: number;
    typologie_pertes: string;
    correction: number;
    date_correction: Date;
    volume: number;
    //Champs Simbox
    total_simbox_onnet: number;
    total_simbox_offnet: number;
    total_sbx: number;
    sbx_offnet_op2: number;
    sbx_offnet_op3: number;
    total_mou: number;
    mou_onnet: number;
    mou_op2: number;
    mou_op3: number;
    total_fx_pos: number;
    fx_pos_op2: number;
    fx_pos_op3: number;
    vlm_int_ent: number;
    prc_act_int: number;
    vlm_total_int_nat: number;
    vlm_int_nat_op2: number;
    vlm_int_nat_op3: number;
    revenu_sauve: number;
    typologie_perte: TypologiePerte;
    perte: number;
    risque_pertes: number;
    statistique: Statistique;
}

export class TypologiePerte {
    id: number;
    libelle: string;
    code: string;
}

export class Statistique{
    id: number;
    nombre_periodique: number;
    periode: Periode;
    suivi_id: Suivi;
    date_debut: Date;
    date_fin: Date;
    type_controle: TypeControle;
    domaine: Domaine;
    entite: Entite;
    porteur: User;
    perte: number;
    sauve: number;
}

export class Periode{
    id: number;
    nom_periode: string;
    rang: number;
    annee: number;
    date_debut: Date;
    date_fin: Date;
}


export class Reporting {
    month_loss: number;
    month_save: number;
    pourc_loss: string;
    pourc_save: string;
    controles: Array<Controles>;
    other_loss: number;
    other_save: number;
    recouvrement: number;
    pertes_stop: number;
}

export class PertesParEntite {
    libelle: string;
    pertes: number;
}

export class Controles {
    label_loss_tc: string;
    label_save_tc: string;
    loss_tc: number;
    save_tc: number;
    activites: Array<Activites>;
}

export class Activites {
    libelle: string;
    loss_ac: number;
    save_ac: number;
}
