import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private db: FirebaseService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
    });
  }

  
  async Login() {
    const loading = await this.db.loader().create();
    await loading.present();
    this.db.Login(this.form.value).then(res => {

      this.getUserData(res.user.uid);

      loading.dismiss();
    }, error => {
      this.db.Toast(error.message);
      loading.dismiss();
    });
  }


  
  async getUserData(uid) {
    const loading = await this.db.loader().create();
    await loading.present();

    this.db.getDataById('empleados', uid).valueChanges()
      .subscribe((data:any) => {
        
        data.id = uid
        localStorage.setItem('user',JSON.stringify(data));

        if(data.role.rango == '1'){
          this.db.goTo('dashboard/crear-tarea');          
        }
    
        if(data.role.rango == '2'){
          this.db.goTo('dashboard/crear-tarea');
        }
        
        if(data.role.rango == '3'){
          this.db.goTo('dashboard/tareas-de-equipo');
        }
        
        this.form.reset();

        loading.dismiss();
      }, error => {
        loading.dismiss();       
      });
  }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
 
}
