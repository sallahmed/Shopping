import { Injectable } from '@angular/core';

export interface Suivi {
  jour: string;
  total_HLR: string;
  not_camel: string;
  imsi_prepaid: string;
  volume_mn: string;
  correction: string;
  date_correction: string;
  risques_pertes_revenus: string;
}

const data: Suivi[] = [
  {
    jour: '01/05/2018',
    total_HLR: '8970000',
    not_camel: '86',
    imsi_prepaid: '10000000',
    volume_mn: '300000',
    correction: 'non applicable',
    date_correction: 'ouvert',
    risques_pertes_revenus: '27550450'
  },
  {
    jour: '02/05/2018',
    total_HLR: '9275000',
    not_camel: '90',
    imsi_prepaid: '18750000',
    volume_mn: '475000',
    correction: 'non applicable',
    date_correction: 'ouvert',
    risques_pertes_revenus: '32480850'
  },
];


@Injectable()
export class SuiviService {

  constructor() { }

  getData(){
    return data;
  }
}
