import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients/patients.component';
import { PatientAddComponent } from './patient-add/patient-add.component';

const routes: Routes = [
  { path: '', component: PatientsComponent, pathMatch: 'full' },
  { path: 'add', component: PatientAddComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
