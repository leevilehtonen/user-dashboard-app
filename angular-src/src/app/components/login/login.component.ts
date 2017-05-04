import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  complexForm: FormGroup;

  constructor(private fb: FormBuilder,
    private flashMsg: FlashMessagesService,
    private router: Router,
    private location: Location,
    private authService: AuthService) { }

  buildForm() {
    this.complexForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  onLoginSubmit() {
    const user = {
      username: this.complexForm.value.username,
      password: this.complexForm.value.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMsg.show(data.msg, { cssClass: 'alert alert-success', timeout: 3000 });
        this.complexForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMsg.show(data.msg, { cssClass: 'alert alert-danger', timeout: 3000 });
        this.complexForm.reset();
        this.router.navigate(['/login']);
      }
    });
  }


  onBackButtonClick() {
    this.location.back();
  }

}
