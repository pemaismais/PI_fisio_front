import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { SelectionService } from '../../../../services/selection.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-keycloak-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MdbFormsModule,
    MatButtonModule
  ],
  providers: [MdbModalService],
  template: `
    <div class="d-flex flex-column main-container justify-content-around mb-3">
      <h3 class="card-title">Faça login para continuar</h3>
      <div class="d-flex justify-content-center mt-4">
        <button pButton
          label="Login com Google"
          icon="pi pi-google"
          class="p-button-raised"
          (click)="loginWithKeycloak()">
          Login com Google
        </button>
      </div>
      <div *ngIf="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .main-container {
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      max-width: 500px;
      margin: 0 auto;
    }
    .card-title {
      text-align: center;
      margin-bottom: 1.5rem;
    }
  `]
})
export class KeycloakLoginComponent implements OnInit {
  errorMessage: string = '';
  modalRef: MdbModalRef<ModalComponent> | null = null;
  processingCallback: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private selectionService: SelectionService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    // Se o usuário já estiver logado, carrega os dados direto
    if (this.authService.isLoggedIn()) {
      this.checkUserData();
      return;
    }

    // Aqui verifico se tem retorno do Keycloak (code e session_state)
    this.route.queryParams.subscribe(params => {
      if (params['code'] && params['session_state'] && !this.processingCallback) {
        this.processingCallback = true;
        console.log('Detectado callback do Keycloak');

        // Pequeno delay pra garantir que o login seja processado
        setTimeout(() => {
          if (this.authService.isLoggedIn()) {
            console.log('Usuário autenticado após callback');
            this.checkUserData();
          } else {
            // Algo deu errado, provavelmente token não processado
            console.error('Falha na autenticação após callback');
            this.errorMessage = 'Erro durante a autenticação. Por favor, tente novamente.';

            // Limpa os parâmetros da URL pra não ficar tentando de novo à toa
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: {},
              replaceUrl: true
            });
          }
          this.processingCallback = false;
        }, 1000);
      }
    });
  }

  loginWithKeycloak(): void {
    // Dispara o redirecionamento pro Keycloak
    try {
      this.authService.loginWithKeycloak();
    } catch (error) {
      console.error('Erro ao fazer login com Keycloak', error);
      this.errorMessage = 'Erro ao tentar fazer login. Por favor, tente novamente.';
    }
  }

  private checkUserData(): void {
    // Busca as infos do usuário após login
    this.userService.getInfo().subscribe({
      next: (user) => {
        // Pega o nome do usuário do token e salva no localStorage
        this.authService.getUserInfo().then(profile => {
          if (profile && profile.name) {
            localStorage.setItem('userName', profile.name);
          }
        });

        // Verifica se já tem as intensidades articulares
        if (user.jointIntensities && user.jointIntensities?.length > 0) {
          this.selectionService.setJointIntensities(user.jointIntensities);
          this.openModal(); // já mostra o modal direto se tiver
        } else {
          this.router.navigate(['/login/userinfo']); // senão, manda pra tela de completar perfil
        }
      },
      error: (err) => {
        console.error('Erro ao obter informações do usuário:', err);
        this.errorMessage = 'Erro ao carregar dados do usuário. Por favor, tente novamente.';
      }
    });
  }

  openModal(): void {
    // Modal com a seleção inicial
    this.modalRef = this.modalService.open(ModalComponent);
  }
}
