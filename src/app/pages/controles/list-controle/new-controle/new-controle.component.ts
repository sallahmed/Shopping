import { Component,ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { Controle, TypeControle, TypeTrafic, Entite, MethodeControle } from '../controle.model';
import {  CouvertureControle, Outil, Periodicite, Activite, Flux } from '../controle.model';
import { ControlesService } from '../controles.service';
import { excelFileValidator } from '../../../../theme/utils/app-validators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-controle-dialog',
  templateUrl: './new-controle.component.html',
  styleUrls: ['./new-controle.component.scss']
})

export class NewControleComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  listTypeControle: any[]; listTypeTrafic: any[]; listEntite: any[]; listPeriodicite: any[]; listActivite: any[]; listFlux: any[];
  listMethodeControle: any[]; listOutil: any[]; listCouvertureControle: any[]; listDomaine: any[]; listPorteur: any[];
  public controle: Controle; sousDomaines: any[] = [];
  file: File;
  listControles: any[];
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  selected = 'null';
  simpleSelected = 1;
  FilterPlaceholder = 'Type your filter here...';
  ShowFilter = true;
  Disabled = false;
  AllowParentSelection = true;
  public MaxDisplayed = 5;

  @ViewChild('fileInput')
      fileInput: ElementRef;

  constructor(/*public dialogRef: MatDialogRef<NewControleComponent>,
              @Inject(MAT_DIALOG_DATA) public controle: Controle,*/
              public router: Router, private toastr: ToastrService,
              public fb: FormBuilder, public controleService: ControlesService) {
    this.form = this.fb.group({
      id: null,
      reference: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      priorite: null,
      maturite: null,
      risque_identifie: null,
      qualification_risque: null,
      ctg: null,
      description: [null, Validators.compose([Validators.required])],
      date_demarrage: null,
      template: this.fb.group({
        //id: null,
        filename: [null, Validators.compose([excelFileValidator, Validators.required])],
        filetype: null,
        value: null
      }),
      type_controle: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        code: null,
        controle: null
      }),
      domaine: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        code: null,
        controle: null
      }),
      activite: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        code: null
      }),
      /*flux: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        code: null
      }),*/
      flux: this.fb.array([]),
      sous_domaine: this.fb.group({
        id: null,
        libelle: null,
        code: null
      }),
        /*
      porteur: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        nom: null,
        prenom: null,
      }),*/
      type_trafic: this.fb.group({
        id: null,
        libelle: null,
        code: null,
        //controle: null
      }),
      periodicite: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        valeur: null,
        code: null,
      }),
      methode_controle: this.fb.group({
        id: null,
        libelle: null,
        code: null
      }),
      outil: this.fb.group({
        id: null,
        libelle: null
      }),
      couverture_controle: this.fb.group({
        id: null,
        libelle: null,
        code: null
      })
    });
  }

  ngOnInit() {
      //this.controleService.selectedControle = this.resetForm();
      this.controleService.getListTypesControles().subscribe(data => this.listTypeControle = data);
      this.controleService.getListTypesTrafics().subscribe(data => this.listTypeTrafic = data);
      this.controleService.getListDomaines().subscribe(data => this.listDomaine = data);
      //this.controleService.getListPorteurs().subscribe(data => this.listPorteur = data);
      //this.controleService.getListEntites().subscribe(data => this.listEntite = data);
      this.controleService.getListPeriodicites().subscribe(data => this.listPeriodicite = data);
      this.controleService.getListMethodesControles().subscribe(data => this.listMethodeControle = data);
      this.controleService.getListOutil().subscribe(data => this.listOutil = data);
      this.controleService.getListCouvertuesControles().subscribe(data => this.listCouvertureControle = data);
      this.controleService.getListActivites().subscribe(data => this.listActivite = data);
      this.controleService.getListFlux().subscribe(data => this.listFlux = data);
      //this.controle = null;
    //if(this.controle){
    if(this.controleService.selectedControle){
      this.controle = this.controleService.selectedControle; //On récupère le controle envoyé au service
      //this.form.setValue(this.controle);
      this.form.patchValue(this.controle);
    }
    else{
      this.controle = new Controle();
      this.controle.type_controle = new TypeControle();
      this.controle.type_trafic = new TypeTrafic();
      this.controle.entite = new Entite();
      this.controle.periodicite = new Periodicite();
      this.controle.methode_controle = new MethodeControle();
      this.controle.outil = new Outil();
      this.controle.couverture_controle = new CouvertureControle();
    }
  }

    onChange(event) {
        const flux = <FormArray>this.form.get('flux') as FormArray;

        if(event.checked) {
            flux.push(new FormControl(event.source.value));
        } else {
            const i = flux.controls.findIndex(x => x.value === event.source.value);
            flux.removeAt(i);
        }
    }

  close(): void {
    //this.dialogRef.close();
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  onSelectFile(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      //this.form.get('template').setValue(this.file.name);
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.form.get('template').setValue({
            filename: this.file.name,
            filetype: this.file.type,
            value: reader.result.split(',')[1]
          }
        );
      }
      // this.fileInformation = null;
    }
  }

  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
    //this.form = this.fb.group({
    /*
    this.controleService.selectedControle = {
      id: null,
      reference: '',
      libelle: '',
      maturite: '',
      priorite: '',
      risque_identifie: '',
      qualification_risque: '',
      description: '',
      date_demarrage: null,
      type_controle: null,
      domaine: null,
      porteur: null,
      type_trafic: null,
      entite: null,
      periodicite: null,
      methode_controle: null,
      outil: null,
      couverture_controle: null,
      template: null
    })*/
  }


  public saveControle(controle):void {
    if (controle) {
      this.isSubmitted = true;
      this.controleService.addControle(controle).subscribe((data: any) => {
            if(data.Succeeded === true){
              this.isSubmitted = false;
              this.form.reset();
              //this.resetForm(controle);
              this.router.navigate(['/controles/list-controle']);
              this.toastr.success('Enregistrement effectué avec succès!!');
            } else {
              this.isSubmitted = false;
              this.toastr.error('Echec enregistrement!' );
              //this.lblMessage = 'Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' ;
            }
      },
      (err: HttpErrorResponse) => {
        //this.isSavingError = true;
        //console.log(err.status); console.log(err.ok);
        this.isSubmitted = false;
        this.toastr.error('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
      } /*,
      (error) => {
        this.toastr.error('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
        //this.lblMessage = 'Echec enregistrement!!';
      }*/
      );
    }
  }

  getDomaine(event, domaine) {
    this.sousDomaines = domaine.children;
    /*
    if (event.target.selected) {
      confirmation-dialog(event);
      // this.user.Profil = new Profil(event.target.value, event.target.name); // On ajoute un nouveau profil au tableau de profil
    }*/
  }

}
