import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  complexForm: FormGroup;


  constructor(private fb: FormBuilder,
    private flashMsg: FlashMessagesService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private location: Location) { }

  buildForm() {
    this.complexForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
      }, { validator: this.matchPasswords })
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  matchPasswords(group: FormGroup) {

    const password = group.get('password');
    const passwordConfirm = group.get('passwordConfirm');
    if (!password || !passwordConfirm) {
      return null;
    }
    return password.value === passwordConfirm.value ? null : { nomatch: true };
  }

  onRegisterSubmit() {
    const user = {
      email: this.complexForm.value.email,
      username: this.complexForm.value.username,
      name: this.complexForm.value.name,
      password: this.complexForm.value.passwords.password
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMsg.show('You are now registered.', { cssClass: 'alert alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMsg.show('Error in registeration, ' + (data.err.message) , { cssClass: 'alert alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

  }
  onBackButtonClick() {
    this.location.back();
  }

}
