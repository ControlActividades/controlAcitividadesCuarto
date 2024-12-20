import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
//models
import { Reservas } from '../models/reservas';
import { ReservasImprimir } from '../models/ReservaImprimir';
interface CheckReservaResponse {
  hasAcceptedReserva: boolean;
  hasNonAcceptedReserva: boolean;
}

@Injectable({
  providedIn: 'root' 
})
export class ReservasService {
  API_URI = 'https://backend-production-5386.up.railway.app/reservas'; //conexion
  private refreshSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getReservas() {
    return this.http.get<Reservas[]>(`${this.API_URI}`);
  }

  getReserva(idReserva: string | number) {
    return this.http.get<Reservas>(`${this.API_URI}/${idReserva}`);
  }

getReservaPorCancha(idCancha: String| number): Observable<Reservas[]>{
    return this.http.get<Reservas[]>(`${this.API_URI}/porCancha/${idCancha}`);
  }

  saveReserva(reserva: Reservas) {
    return this.http.post(`${this.API_URI}`, reserva).pipe(
      tap(() => this.refreshSubject.next())
    );
  }

  deleteReserva(idReserva: string | number) {
    return this.http.delete(`${this.API_URI}/${idReserva}`).pipe(
      tap(() => this.refreshSubject.next())
    );
  }

  updateReserva(idReserva: string | number, updateReserva: Reservas) {
    return this.http.put(`${this.API_URI}/${idReserva}`, updateReserva).pipe(
      tap(() => this.refreshSubject.next())
    );
  }

  setTableIndex(index: number): void {
    localStorage.setItem('tableIndex', index.toString());
  }

  getTableIndex(): number {
    const index = localStorage.getItem('tableIndex');
    return index ? parseInt(index, 10) : 0;
  }

  get refresh$() {
    return this.refreshSubject.asObservable();
  }

  //oficios de reservas
  getReservaImprimir(idReserva: string | number) {
    return this.http.get<ReservasImprimir>(`${this.API_URI}/imprimir/${idReserva}`);
  }

  //reserva disponible
  checkReserva(horaInicio: string, horaFin: string, fecha: string) {
    return this.http.post<CheckReservaResponse>(`${this.API_URI}/check`, { horaInicio, horaFin, fecha });
  }
  // responsable.service.ts
updateProfileImageUrl(id: string, photoUrl: string): Observable<any> {
  const url = `${this.API_URI}/responsables/${id}/updateProfileImage`; // Asegúrate de que esta URL sea correcta
  return this.http.put(url, { photoUrl });
}




}
