export class User {
  id: number;
  username: string;
  username_canonical: string;
  password: string;
  nom: string;
  prenom: string;
  matricule: string;
  email: string;
  telephone: string;
  email_canonical: string;
  enabled: string;
  salt: string;
  roles: any;
  groups: any;
  locked: boolean;
  manager: boolean;
  last_login: Date;
  profil: UserProfile;
  structure: Structure;
  urlPhoto: string;
  photo: File;
  //contacts: UserContacts;
  //social: UserSocial;
  //settings: UserSettings;
}

export class UserProfile {  
  id: number;
  libelle: string;
  // telephone: string;
  // birthday: Object;
  //  gender: string;
}

export class Structure {
  id: number;
  libelle: string;
  // adresse: number;
  idtype: TypeStructure;
}

export class UserContacts{
  address: string;  
}

export class UserSocial {
  facebook: string;
  twitter: string;
  google: string;
}

export class UserSettings{
  isActive: boolean;
  isDeleted: boolean;
  registrationDate: Date;
  joinedDate: Date;
}

export class TypeStructure {
    id: number;
    libelle: string;
}