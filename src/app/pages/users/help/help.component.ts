import { Component,ViewChild, ElementRef, Input, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public form: FormGroup;

  constructor(public router: Router, public fb: FormBuilder, private translateService: TranslateService) {
      translateService.setDefaultLang('fr');
      translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {}

}
