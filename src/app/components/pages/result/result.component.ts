import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionService } from '../../../services/selection.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JointIntensity } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ExerciseService } from '../../../services/exercise.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { LogoComponent } from "../../common/logo/logo.component";
import { AvatarComponent } from "../../common/avatar/avatar.component";
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatTabsModule, LogoComponent, AvatarComponent],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  selectedRegions: string[] = [];
  selectedExercises: any[] = [];
  jointIntensities: JointIntensity[] = [];
  isDataLoaded: boolean = false;
  // Mapeamento de nomes para português
  private regionMap: { [key: string]: string } = {
    CERVICAL: 'Cervical',
    SHOULDER: 'Ombro',
    LOWERBACK: 'Lombar',
    KNEE: 'Joelho',
    ANKLE: 'Tornozelo',
    HIP: 'Quadril',
  };

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
    private authService: KeycloakService,
    private selectionService: SelectionService,
    private router: Router,
    private sanitizer: DomSanitizer // Add DomSanitizer for safe embedding
  ) {}

  ngOnInit() {
    // se for redirecionado (login ou form)
   
    // if (this.selectionService.getJointIntensities().length > 0) {
    //   this.jointIntensities = this.selectionService.getJointIntensities();
    //   this.selectedRegions = this.selectionService
    //     .getJointIntensities()
    //     .map((jointIntensity) => this.regionMap[jointIntensity.joint] || jointIntensity.joint);
    //   this.fetchExercises();
    // } // Se tiver logado mas nao foi redirecionado
    // else if (this.authService.getAccessToken()) {
    //   this.userService.getInfo().subscribe({
    //     next: (user) => {
    //       if (user.jointIntensities && user.jointIntensities?.length > 0) {
    //         this.jointIntensities = user.jointIntensities;
    //         this.jointIntensities.map((jointIntensity) =>{
    //           this.selectedRegions.push(this.regionMap[jointIntensity.joint] || jointIntensity.joint)
    //         });

    //         this.fetchExercises();
    //       } else {
    //         this.router.navigate(['/login']);
    //       }
    //     },
    //     error: (err) => {
    //       this.router.navigate(['/login']);
    //     },
    //   });
    // } else {
    //   this.router.navigate(['/login']);
    // }
   
  }

  private transformToEmbedUrl(url: string): SafeResourceUrl {
    let videoId: string | undefined;
  
    // Regex para capturar o ID do vídeo de diversos formatos de URL do YouTube
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      videoId = match[1];
    }
  
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
  
    return this.sanitizer.bypassSecurityTrustResourceUrl(''); // Retorna uma URL vazia se não encontrar um ID válido
  }

  message() {
    const back = confirm('Tem certeza que deseja voltar ao início?');
    if (back) {
      this.router.navigate(['/home']);
    }
  }

  fetchExercises() {
    const requests: Observable<any>[] = [];
     // stackando os requests
    this.jointIntensities.map((jointIntensity) => {
      const exerciseRequest =
        this.exerciseService.getExercisesByJointAndIntensity(
          jointIntensity.joint,
          jointIntensity.intensity
        );
      requests.push(exerciseRequest);
    });

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        this.selectedExercises = responses.flat().map((exercise: any) => ({
          ...exercise,
          joint: this.regionMap[exercise.joint] || exercise.joint, // Traduza a região aqui
          embedUrl: this.transformToEmbedUrl(exercise.videoUrl),
        }));
        console.log('Exercise responses:', responses);
        this.isDataLoaded = true; // Define que os dados foram carregados
      },
      error: (err) => {
        console.error('Error fetching exercises:', err);
      },
    });

    console.log('regioess ', this.selectedRegions);

    // this.selectedRegions = this.selectionService.getSelectedRegions();

    // this.selectedRegions = this.selectionService
    //   .getSelectedRegions()
    //   .map((region) => this.regionMap[region] || region);
  }


  backToHome(){
    this.router.navigate(['/form']);
  }
}
