import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {
  form: FormGroup;
  imageFile: File = null;

  constructor(private patientService: PatientService,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      name: null,
      fileNo: null,
      citizenId: null,
      birthdate: formatDate(new Date(2000, 0, 1), 'yyyy-MM-dd', 'en-US'),
      gender: 1,
      nationality: null,
      phoneNumber: null,
      email: null,
      country: null,
      city: null,
      street: null,
      address1: null,
      address2: null,
      contactPerson: null,
      contactRelation: null,
      contactPhone: null,
      photoUrl: null,
      firstVisitDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    });
  }

  ngOnInit() {
  }

  submit() {
    if (!this.form.valid) {
      console.log(`isValid: ${this.form.valid}`);
      return;
    }

    const patientObj: Patient = {
      name: this.name.value,
      fileNo: this.fileNo.value,
      citizenId: this.citizenId.value,
      birthdate: this.birthdate.value,
      gender: this.gender.value,
      nationality: this.nationality.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value,
      country: this.country.value,
      city: this.city.value,
      street: this.street.value,
      address1: this.address1.value,
      address2: this.address2.value,
      contactPerson: this.contactPerson.value,
      contactRelation: this.contactRelation.value,
      contactPhone: this.contactPhone.value,
      photoUrl: this.photoUrl.value,
      firstVisitDate: this.firstVisitDate.value
    };

    this.patientService.addPatient(this.form.value, this.imageFile).subscribe(value => {
      console.log(value);
      this.router.navigate(['/']);
    });
  }

  get genders() {
    return [
      {
        id: 0, value: 'Male'
      },
      {
        id: 1, value: 'Female'
      }
    ];
  }

  fileChanged(files: FileList) {
    this.imageFile = files.item(0);
  }

  get name() { return this.form.controls.name; }
  get fileNo() { return this.form.controls.fileNo; }
  get citizenId() { return this.form.controls.citizenId; }
  get birthdate() { return this.form.controls.birthdate; }
  get gender() { return this.form.controls.gender; }
  get nationality() { return this.form.controls.nationality; }
  get phoneNumber() { return this.form.controls.phoneNumber; }
  get email() { return this.form.controls.email; }
  get country() { return this.form.controls.country; }
  get city() { return this.form.controls.city; }
  get street() { return this.form.controls.street; }
  get address1() { return this.form.controls.address1; }
  get address2() { return this.form.controls.address2; }
  get contactPerson() { return this.form.controls.contactPerson; }
  get contactRelation() { return this.form.controls.contactRelation; }
  get contactPhone() { return this.form.controls.contactPhone; }
  get photoUrl() { return this.form.controls.photoUrl; }
  get firstVisitDate() { return this.form.controls.firstVisitDate; }
}
