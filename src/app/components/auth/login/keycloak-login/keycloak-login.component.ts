import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserService } from '../../../../services/user.service';
import { SelectionService } from '../../../../services/selection.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { KeycloakService } from 'keycloak-angular';

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
  templateUrl: './keycloak-login.component.html',
  styleUrls: ['./keycloak-login.component.scss'],
})
export class KeycloakLoginComponent implements OnInit {
  errorMessage: string = '';
  modalRef: MdbModalRef<ModalComponent> | null = null;
  processingCallback: boolean = false;

  constructor(
    private authService: KeycloakService,
    private userService: UserService,
    private selectionService: SelectionService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {}

  async ngOnInit(): Promise<void> {
    if (await this.authService.isLoggedIn()) {
      this.checkUserData();
    }
  }

  loginWithKeycloak(): void {
    // Dispara o redirecionamento pro Keycloak
    try {
      this.authService.login({
        redirectUri: window.location.origin + '/login',
        idpHint: 'google', // força usar Google direto como provedor
        prompt: 'login' // força mostrar a tela de login sempre
      });

    } catch (error) {
      console.error('Erro ao fazer login com Keycloak', error);
      this.errorMessage = 'Erro ao tentar fazer login. Por favor, tente novamente.';
    }
  }

  private checkUserData(): void {
    // Busca as infos do usuário após login
    this.userService.getInfo().subscribe({
      next: (user) => {
        console.log(user)
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
