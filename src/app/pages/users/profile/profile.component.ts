import { Component,ViewChild, ElementRef, Input, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User, UserProfile, Structure, UserContacts, UserSocial, UserSettings } from '../user.model';
import {UsersService} from '../users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import {emailValidator, excelFileValidator, phoneNumberValidator} from '../../../theme/utils/app-validators';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';
//import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public currentUser: any;
  public url = '';
  public userImage = 'assets/img/users/default-user.jpg';
  public isSubmitted = false;

  constructor(public router: Router, private toastr: ToastrService, private translateService: TranslateService,
              public fb: FormBuilder, public userService: UsersService, public snackBar: MatSnackBar) {
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
      telephone: null,
      structure: this.fb.group({
        id: null,
        libelle: null,
      }),
      photo: this.fb.group({
          filename: null,
          filetype: null,
          value: null
      })
    });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.url = this.currentUser.url_photo ? 'http://' + this.currentUser.url_photo : '';
    if(this.currentUser)
      this.form.patchValue(this.currentUser);

  }

  ngOnInit() {
  }

  close(): void {
      this.router.navigate(['/dashboard']);
  }


  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
  }


  public save(user): void {
    console.log(user);
      this.isSubmitted = true;
      this.userService.updateProfil(user).subscribe((data: any) => {
              this.isSubmitted = false;
              this.router.navigate(['/dashboard']);
              this.snackBar.open('Enregistrement réussi!Vos changements prendront effet à votre prochaine session.', 'Confirmation', {
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

  openFileBrowser(event: any){
    event.preventDefault();
    let element: HTMLElement = document.getElementById('uploader-input') as HTMLElement;
    element.click();
  }

  onFileChange(event: any){
    let files = event.target.files;
    //this.url = files[0].names;
    var reader = new FileReader();
    reader.onload = e => {
        this.url = reader.result;
        this.form.get('photo').setValue({
            filename: files[0].name,
            filetype: files[0].type,
            value: reader.result.split(',')[1]
           }
        );
    }//Afficher l'image
    reader.readAsDataURL(files[0]);
  }

  allowDrop(event){
    event.preventDefault();
  }
  drag(event){
    event.dataTransfer.setData('text', event.target.id);
  }
  drop(event){
      event.preventDefault();
      var data = event.dataTransfer.getData('text');
      //event.target.appendChild(document.getElementById(data));
      //console.log(event.dataTransfer.files);
      let files = event.dataTransfer.files;
      var reader = new FileReader();
      //reader.onload = e => this.url = reader.result; //Afficher l'image
      reader.onload = e => {
          this.url = reader.result;
          this.form.get('photo').setValue({
              filename: files[0].name,
              filetype: files[0].type,
              value: reader.result.split(',')[1]
             }
          );
      } //Afficher l'image
      reader.readAsDataURL(files[0]);
  }
}
