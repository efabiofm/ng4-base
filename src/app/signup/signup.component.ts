import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private signupForm: FormGroup;
  private submitted: boolean;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.submitted = false;
    this.signupForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'confirmPassword': [null, Validators.required]
    }, {
      validator: this.checkPasswords
    });
  }

  ngOnInit() {
  }

  signup(form: FormGroup) {
    this.submitted = true;
    if(form.valid){
      this.auth.signup(form.value).subscribe({
        complete: () => this.router.navigate(['/'])
      })
    }
  }

  checkPasswords(formGroup: FormGroup) {
    let password = formGroup.controls.password;
    let confirmPassword = formGroup.controls.confirmPassword;
    if(password.invalid || password.value !== confirmPassword.value) {
      return confirmPassword.setErrors({notMatch: true});
    }
    return confirmPassword.setErrors(null);
  }

}
