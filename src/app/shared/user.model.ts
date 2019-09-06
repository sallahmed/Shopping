import {Profil} from './profil.model';

export class User {
    Id: number;
    UserName: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Mobile: number;
    Fixe: number;
    Matricule: number;
    // Profil: Profil[];
    Profil: Profil;
    Avatar: string|any;
    // Avatar: File;
}
