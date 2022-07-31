import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    if (this.isLoginMode) {
      this.auth.login(form.value.email, form.value.password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
          this.router.navigate(['/recipies']);
        },
        (errorMes) => {
          console.log(errorMes);
          this.errorMessage = errorMes;
          this.isLoading = false;
        }
      );
    } else {
      this.auth.signup(form.value.email, form.value.password).subscribe(
        (responsedata) => {
          console.log(responsedata);
          this.isLoading = false;
          this.router.navigate(['/recipies']);
        },
        (errorMes) => {
          console.log(errorMes);
          this.errorMessage = errorMes;
          this.showErrorAlert(errorMes);
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  private showErrorAlert(mes: string) {
    const alertCmpFactory = this.cfr.resolveComponentFactory(AlertComponent);
  }
}
