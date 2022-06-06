import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get title() {
    return this.form.get('title');
  }

  get password() {
    return this.form.get('password');
  }
 
}
