import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public clientId = '5e8346d1c48f4cfca7f42e70a7e6c0f4';
  public clientSecret = '391523739ba64c9b9a516af3a8fa82e8';
  public redirectUri = 'http://localhost:4200/inicio/inicio';
  private authUrl = 'https://accounts.spotify.com/api/token';
  public apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  getAuthUrl(): string {
    const scopes = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private';
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
  }
  

  getAuthToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', this.redirectUri);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    return this.http.post(this.authUrl, body.toString(), { headers });
  }

  getUserPlaylists(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.apiUrl}/me/playlists`, { headers });
  }

  createPlaylist(token: string, userId: string, playlistName: string, playlistDescription: string = '', isPublic: boolean = false): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
  
    const body = {
      name: playlistName,
      description: playlistDescription,
      public: isPublic
    };
  
    return this.http.post(`${this.apiUrl}/users/${userId}/playlists`, body, { headers });
  }
  
  getUserInfo(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.apiUrl}/me`, { headers });
  }
}
