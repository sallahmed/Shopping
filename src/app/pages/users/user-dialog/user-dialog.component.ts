import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User, UserProfile, Structure, UserContacts, UserSocial, UserSettings } from '../user.model';
import {UsersService} from '../users.service';
import { emailValidator, phoneNumberValidator } from '../../../theme/utils/app-validators';
import { MatSnackBar } from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {LoginComponent} from '../../login/login.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public users: User[];
  public form:FormGroup;
  public passwordHide:boolean = true;
  public isSubmitted = false;
  emailPattern = '^[a-z0-9_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  roles: UserProfile[];
  structures: Structure[];
  imageUrl: string = 'assets/img/users/default-user.jpg';
  fileToUpload: File = null;
  public isSuperAdmin = false;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User, public snackBar: MatSnackBar,
              public fb: FormBuilder, public usersService: UsersService, translateService: TranslateService) {
    this.form = this.fb.group({
      id: null,
      username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      username_canonical: null,
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      nom: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      prenom: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      matricule: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      email: [null, Validators.compose([Validators.required, emailValidator])],
      email_canonical: null,
      enabled: null,
      salt: null,
      last_login: null,
      //groups: [],
      roles: null,
      telephone: null,
      locked: null,
      manager: null,
      // urlPhoto: null,
      // photo: null,
      profil: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null
        // telephone: [null, Validators.compose([Validators.required, phoneNumberValidator, Validators.minLength(9)])],
        // birthday: null,
        // gender: null,
      }),
      structure: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        // adresse: null
      })/*,
      contacts: this.fb.group({
        address: null
      }),
      social: this.fb.group({
        facebook: null,
        twitter: null,
        google: null
      }),
      settings: this.fb.group({
        isActive: null,
        isDeleted: null,
        registrationDate: null,
        joinedDate: null
      })*/
    });
    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
    this.usersService.getAllRoles().subscribe(data => this.roles = data);
    this.usersService.getAllStructures().subscribe(data => this.structures = data);
    if(this.user){
      // console.log(this.user);
      //this.form.setValue(this.user);
      this.form.patchValue(this.user);
    }
    else{
      this.user = new User();
      this.user.profil = new UserProfile();
      this.user.structure = new Structure();
      /*this.user.contacts = new UserContacts();
      this.user.social = new UserSocial();
      this.user.settings = new UserSettings();*/
    }
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser.profil.id === 1) {
        this.isSuperAdmin = true;
      }
  }

    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
        let data: FormData = new FormData();
        data.append('Avatar', this.fileToUpload, this.fileToUpload.name);
        this.usersService.Photo = this.fileToUpload;
        // Show image preview
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
            this.usersService.userPhoto = this.imageUrl;
        }
        reader.readAsDataURL(this.fileToUpload);
    }

  close(): void {
    this.dialogRef.close();
  }

    addRole(event, roles, index) {
        if (event.target.selected) {
            alert(event.target.name);
           // this.user.Profil = new Profil(event.target.value, event.target.name); // On ajoute un nouveau profil au tableau de profil
        }
    }

    public getUsers(): void {
        this.users = null; //for show spinner each time
        this.usersService.getUsers().subscribe(users => this.users = users);
    }

    public addUser(user:User){
        this.isSubmitted = true;
        //this.usersService.addUser(user).subscribe(user => this.getUsers());
        this.usersService.addUser(user).subscribe((data: any) => {
                this.isSubmitted = false;
                this.dialogRef.close();
                this.snackBar.open('Enregistrement réussi!', 'Confirmation', {
                    duration: 5000,
                });
            },
            (err: HttpErrorResponse) => {
                this.isSubmitted = false;
                this.snackBar.open('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!', null, {
                    duration: 5000,
                });
            }
        );
    }
    public updateUser(user:User){
        this.isSubmitted = true;
        // this.usersService.updateUser(user).subscribe(user => this.getUsers());
        this.usersService.updateUser(user).subscribe((data: any) => {
                this.isSubmitted = false;
                this.dialogRef.close();
                this.snackBar.open('Enregistrement réussi!', 'Confirmation', {
                    duration: 5000,
                });
            },
            (err: HttpErrorResponse) => {
                this.isSubmitted = false;
                this.snackBar.open('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!', null, {
                    duration: 5000,
                });
            }
        );
    }

    save(user){
        if(user){
            (user.id) ? this.updateUser(user) : this.addUser(user);
        }
    }

}
