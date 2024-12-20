import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = 'tbwmf2ibi9w4acueszpb7rqz2fsozb'; 
  private redirectUri = window.location.hostname === 'localhost'
  ? 'http://localhost:4200/inicio/cancha'
  : 'https://controlac-8eff8.web.app/inicio/cancha';
  private responseType = 'token';

  constructor() {}

  getAuthUrl() {
    const scope = 'user:edit channel:manage:broadcast'; 
    return `https://id.twitch.tv/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${this.responseType}&scope=${scope}`;
  }
  
}
