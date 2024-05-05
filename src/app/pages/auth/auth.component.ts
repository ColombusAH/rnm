import { Component, inject } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [InputTextModule, ButtonModule, RippleModule, TranslateModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [{value: ''}, [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  });
  isLoginMode = toSignal(this.route.url.pipe(map(url => url[0].path === 'login'), tap(isLogin => {
    if (isLogin) {
      this.form.get('confirmPassword')?.disable();
      this.form.get('username')?.disable();
    } else {
      this.form.get('confirmPassword')?.enable();
      this.form.get('username')?.enable();
    }
  })));


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if(this.isLoginMode()) { 
    const {email, password} = this.form.value as {email: string, password: string};
    this.authService.login(email, password).subscribe(() => {
      this.router.navigate(['']);
    }
    );
  } else {
    const {email, password, username} = this.form.value as {email: string, password: string, username: string};
    this.authService.register({email, password, username}).subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}

}
