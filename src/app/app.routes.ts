import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FormComponent } from './components/pages/form/form/form.component';
import { ResultComponent } from './components/pages/result/result.component';
import { AdminComponent } from './components/layout/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ExerciseManagementComponent } from './components/admin/exercise/exercisemanagement/exercisemanagement.component';
import { UserManagementComponent } from './components/admin/user/usermanagement/usermanagement.component';
import { MainComponent } from './components/layout/main/main.component';
import { FormIntensidadeComponent } from './components/pages/form/form-intensidade/form-intensidade.component';
import { UserInfoLoginComponent } from './components/auth/login/user-info-login/user-info-login.component';
import { MainLoginComponent } from './components/auth/login/main-login/main-login.component';
import { ModalComponent } from './components/common/modal/modal.component';
import { NgModule } from '@angular/core';
import { MainFormComponent } from './components/pages/form/main-form/main-form.component';
import { KeycloakLoginComponent } from './components/auth/login/keycloak-login/keycloak-login.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'result',
        canActivate: [AuthGuard],
        component: ResultComponent,
        children: [{ path: 'modal', component: ModalComponent }],
      },
     
      {
        path: 'login',
        component: MainLoginComponent,
        children: [
          { path: '', component: KeycloakLoginComponent }, 
          { path: 'google', component: KeycloakLoginComponent }, 
          {     
            canActivate: [AuthGuard],
            path: 'userinfo',
            component: UserInfoLoginComponent 
          },
        ],
      },
      {
        path: 'form',
        component: MainFormComponent,
        canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'exercise', pathMatch: 'full' },
      { path: 'exercise', component: ExerciseManagementComponent },
      { path: 'user', component: UserManagementComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
