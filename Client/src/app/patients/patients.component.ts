import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patientsObs: Observable<Patient[]>;

  constructor(private patientService: PatientService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.patientsObs = this.patientService.getPatients();
  }

  delete(id) {
    this.patientService.deletePatient(id).subscribe((value) => {
      this.loadList();
    });
  }

  getPhotoUrl(item) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://localhost:5001/photos/${item.id}.png`);
  }
}
