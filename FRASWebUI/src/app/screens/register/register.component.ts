import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcDept: new FormControl('', Validators.required),
    fcColName: new FormControl('', Validators.required),
   
  });

  error: string = '';

  ngOnInit(): void {}

  onSubmit() {
    // if (
    //   this.registerForm.value['fcPassword'] !==
    //   this.registerForm.value['fcPassword2']
    // ) {
    //   this.error = 'Password doesnt match!';
    //   alert(this.error);
    //   return;
    // }
    // if (!this.registerForm.valid) {
    //   {
    //     this.error = 'No fields must be empty';
    //     console.log(this.error);
    //     return;
    //   }
    // }
    if (this.registerForm.valid) {
      
      var payload: {
        name: string;
        department: string;
        collegeName: string;
        onLeave: boolean;
        onResigned: boolean;
      };
      payload = {
        name: this.registerForm.value.fcName,
        department: this.registerForm.value.fcDept,
        collegeName: this.registerForm.value.fcColName,
        onLeave: false,
        onResigned: false

      };
      console.log(payload);
      this.auth.register(payload).then((data) => {
        console.log(data);
        if (this.auth.authenticated) {
          alert("Successfully Created Account");
          this.nav('accounts');
        // } else {
        //   this.error = data.data;
        //   console.log(this.error);
        }
      });
    }
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}