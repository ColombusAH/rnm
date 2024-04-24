import { Component, inject } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf,InputTextModule, ButtonModule, RippleModule, TranslateModule,RouterModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [{value: ''}, [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  });
  isLoginMode = toSignal(this.route.url.pipe(map(url => url[0].path === 'login'), tap(isLogin => {
    if (isLogin) {
      this.form.get('confirmPassword')?.disable();
      this.form.get('email')?.disable();
    } else {
      this.form.get('confirmPassword')?.enable();
      this.form.get('email')?.enable();
    }
  })));


  onSubmit() {
    console.log('onSubmit');
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }


}
