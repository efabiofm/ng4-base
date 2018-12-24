import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted: boolean;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.submitted = false;
    this.loginForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'remember': [true]
    });
  }

  ngOnInit() {
  }

  login(form: FormGroup) {
    this.submitted = true;
    if(form.valid){
      this.auth.login(form.value.email, form.value.password, form.value.remember).subscribe({
        complete: () => this.router.navigate(['/'])
      })
    }
  }

}
