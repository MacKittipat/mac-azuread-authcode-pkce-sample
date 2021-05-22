import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  code = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params.code;
    });
    console.log(`code = ${this.code}`);

    const payload = new HttpParams()
      .set('client_id', environment.clientId)
      .set('grant_type', 'authorization_code')
      .set('code', this.code)
      .set('redirect_uri', environment.redirectUrl)
      .set('code_verifier', 'hello')
      .set('scope', environment.scope);

    this.http.post(`https://login.microsoftonline.com/${environment.tenantId}/oauth2/v2.0/token`, payload)
      .subscribe(res => {
        console.log(res);
      });
  }

}
