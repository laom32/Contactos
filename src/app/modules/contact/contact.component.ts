import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'app/services/contact.service';
import { LocationsService } from 'app/services/locations.service';
import { SweetAlertMsgService } from 'app/services/sweelAlert.service';
import { locationValidator, WhiteSpaceValidator } from 'app/validatorsControls';
import { map, Observable, startWith } from 'rxjs';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  filteredOptions!: Observable<any[]>;
  options: any[] = [];
  minDate: Date = new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate());
  maxDate: Date = new Date();
  blockButton: boolean = false;
  finish: boolean = false;
  /**
   *
   */
  constructor(
    private _location: LocationsService,
    private _contact: ContactService,
    private _msg: SweetAlertMsgService
  ) {

  }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(3),
        WhiteSpaceValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        // Validators.email,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9()#+\s-]+$/),
        Validators.maxLength(15),
        Validators.minLength(10)
      ]),
      date: new FormControl(new Date(), [Validators.required]),
      cityState: new FormControl('', [
        Validators.required,
        locationValidator
      ]),
    });
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayLocation(zona: any): string {
    return zona && zona.name ? `${zona.name}, ${zona?.adminName1}, ${zona?.countryName}` : '';
  }
  searchLocations(ev: any) {
    let txt = ev.target.value;

    if (txt.length < 3) {
      return;
    }
    this._location.getLocations(txt).subscribe({
      next: data => {
        console.log(data);
        if (data.isSuccess) {
          this.options = data.result.geoNames;
          this.filteredOptions = this.contactForm.controls["cityState"].valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value.name || '')),
          );
        }
      }, error: data => {
        console.log(data);
      }
    });
  }
  preSave() {
    console.log(this.contactForm.value);


    if (this.contactForm.invalid) {
      // Object.keys(this.contactForm.controls).forEach(key => {
      //   const controlErrors: ValidationErrors = this.contactForm.get(key)?.errors || {};
      //   if (controlErrors != null) {
      //     Object.keys(controlErrors).forEach(keyError => {
      //       console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      //     });
      //   }
      // });
      let campos: string[] = [];
      if (this.contactForm.controls["name"].invalid) {
        campos.push("<br>- Nombre");
      }
      if (this.contactForm.controls["email"].invalid) {
        campos.push("<br>- E-mail");
      }
      if (this.contactForm.controls["phone"].invalid) {
        campos.push("<br>- Teléfono");
      }
      if (this.contactForm.controls["date"].invalid) {
        campos.push("<br>- Fecha");
      }
      if (this.contactForm.controls["cityState"].invalid) {
        campos.push("<br>- Ciudad y Estado");
      }
      // console.log(campos.toString());
      this._msg.alertWarning("Atención", `Se encontraron los siguientes errores en sus datos de contacto: ${campos.toString()}`);
      return;
    }

    this.save();
  }

  save() {
    let dir = this.contactForm.value.cityState;
    const info = Object.assign({}, this.contactForm.value, { cityState: `${dir.name}, ${dir.adminName1}, ${dir.countryName}` });
    this.disableForm();
    
    this._contact.Save(info).subscribe({
      next: data => {
        console.log(data);
        if (data.isSuccess) {
          this.finish = true;
          // this.resetForm();
        }
      }, error: data => {
        console.log(data);
      },
      complete: () => {
        this.enableForm();
      }
    });
  }
  disableForm() {
    this.contactForm.disable();
    this.blockButton = true;
  }
  enableForm() {
    this.contactForm.enable();
    this.blockButton = false;
  }
  resetForm() {
    this.contactForm.reset();
    this.contactForm.controls["date"].setValue(new Date());
  }

}
