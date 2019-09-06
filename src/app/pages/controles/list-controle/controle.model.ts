import {User} from '../../users/user.model';
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
    ctg: boolean;
    modele: any[];
    nbre_champs: number;
    etat: any;
    statut: any;
}

export class Document {
    id: number;
    filename: string;
    filetype: string;
    value: number;
    blob: Blob;
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
    total_simbox: number;
    simbox_offnet_operateur2: number;
    simbox_offnet_operateur3: number;
    total_minute_of_use: number;
    mou_onnet: number;
    mou_op2: number;
    mou_op3: number;
    total_faux_positif: number;
    faux_positif_op2: number;
    faux_positif_op3: number;
    volume_international_entrant: number;
    parc_actif_international: number;
    volume_total_interco_nat: number;
    volume_interco_nat_op2: number;
    volume_interco_nat_op3: number;
    //Champs Bypass OM
    count_distinct_ofuser: number;
    count_ofuser: number;
    nb_transa_global: number;
    mtt_bypass_com_sous_dist: number;
    mtt_bypass_com_grossiste: number;
    mtt_bypass_com_total_glob: number;
    mtt_com_due_sous_distr_gl: number;
    mtt_com_due_gros_global: number;
    delta_com_sous_distr_glo: number;
    delta_com_gros_global: number;
    delta_com_total_global: number;
    count_distinct_of_user_bypass: number;
    nb_transa_total_bypass: number;
    amount_transa_total_bypass: number;
    sum_mtt_palier_normal_bypass: number;
    sum_mtt_bypass_com_sous_d_bypass: number;
    sum_mtt_bypass_com_gros_bypass: number;
    sum_bypass_com_sous_dist_bypass: number;
    sum_mtt_com_due_sous_dist_bypass: number;
    sum_mtt_com_due_gros_bypass: number;
    sum_delta_com_sous_dist_bypass: number;
    sum_delta_com_gros_bypass: number;
    count_distinct_of_sender_fract: number;
    nb_transa_total_fract: number;
    amount_transa_ttfract: number;
    sum_mtt_normal_com_sous_d_fract: number;
    sum_mtt_normal_com_gros_fact: number;
    sum_mtt_normal_com_sous_fract: number;
    sum_mtt_com_due_sous_dis_fract: number;
    sum_mtt_com_due_gros_fract: number;
    sum_delta_com_sous_dist_fract: number;
    sum_delta_com_gros_fract: number;
    count_distinct_ofparent_m_s_i_s_d_n: number;
    count_distinct_of_categorie_cra: number;
    revenu_sauve: number;
    typologie_perte: TypologiePerte;
    perte: number;
    risque_pertes: number;
    statistique: Statistique;
    //Champs Reporting
    recouvrement: number;
    pertes_stop: number;
}

export class PertesParTypologie {
    name: string;
    value: number;
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
    typologie_perte: TypologiePerte;
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

export class Dysfonctionnement{
    id:number;
    libelle: string;
    controle: Controle;
    porteur: User;
    date_debut: Date;
    date_fin: Date;
}