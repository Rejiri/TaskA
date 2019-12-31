import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Patient } from './models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url = 'https://localhost:5001/api/patients/';
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url).pipe(retry(3), catchError(this.handleError));
  }

  addPatient(patient, file: File): Observable<Patient> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('jsonObj', JSON.stringify(patient));
    return this.http.post<Patient>(this.url, formData).pipe(retry(3), catchError(this.handleError));
  }

  deletePatient(id: string): Observable<Patient> {
    return this.http.delete<Patient>(this.url + id).pipe(retry(3), catchError(this.handleError));
  }

  handleError(error) {
    if (error.message) {
      console.log(`Code: ${error.status} - Message: ${error.message}`);
    }
    return throwError(error);
  }
}
