import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { FormComponent } from './components/layout/forms/form/form.component';
import { ResultComponent } from './components/layout/result/result.component';
import { AdminComponent } from './components/layout/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ExerciseManagementComponent } from './components/exercise/exercisemanagement/exercisemanagement.component';
import { UserManagementComponent } from './components/user/usermanagement/usermanagement.component';
import { MainComponent } from '../app/components/main/main.component';
import { FormIntensidadeComponent } from './components/layout/forms/form-intensidade/form-intensidade.component';
import { UserInfoLoginComponent } from './components/layout/login/user-info-login/user-info-login.component';
import { MainLoginComponent } from './components/layout/login/main-login/main-login.component';
import { LoginGoogleComponent } from './components/layout/login/login-google/login-google.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { MainFormComponent } from './components/layout/forms/main-form/main-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'result',
        component: ResultComponent,
        children: [{ path: 'modal', component: ModalComponent }],
      },
      {
        path: 'login',
        component: MainLoginComponent,
        children: [
          { path: '', component: LoginGoogleComponent },
          { path: 'userinfo', component: UserInfoLoginComponent },
        ],
      },
      {
        path: 'form',
        component: MainFormComponent,
        children: [
          { path: '', component: FormComponent },
          { path: 'pain', component: FormIntensidadeComponent },
        ],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'exercise', pathMatch: 'full' },
      { path: 'exercise', component: ExerciseManagementComponent },
      { path: 'user', component: UserManagementComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
