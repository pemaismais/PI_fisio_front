import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Exercise, Intensity, IntensityPTBR, Joint, JointPTBR } from '../../../../models/exercise';
import { NgFor, NgIf } from '@angular/common';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
@Component({
  selector: 'app-exercisedetails',
  standalone: true,
  imports: [
    MdbValidationModule,
    MdbFormsModule,
    MdbDropdownModule,
    MdbRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './exercisedetails.component.html',
  styleUrl: './exercisedetails.component.scss',
})
export class ExercisedetailsComponent {
  @Input('exercise') exercise: Exercise = new Exercise(0, '', '', '', '', null, null);
  @Output('return') return = new EventEmitter<any>();

  // Objetos utilizados nos selects.
  intensityOptions = Object.keys(Intensity).map((key) => ({
    value: Intensity[key as keyof typeof Intensity],
    viewValue: IntensityPTBR[Intensity[key as keyof typeof Intensity] as keyof typeof IntensityPTBR],
  }));

  jointOptions = Object.keys(Joint).map((key) => ({
    value: Joint[key as keyof typeof Joint],
    viewValue: JointPTBR[Joint[key as keyof typeof Joint] as keyof typeof JointPTBR], // Valor do enum em ptbr
}));

  intensityControl = new FormControl(this.exercise.intensity, Validators.required);
  jointControl = new FormControl(this.exercise.joint, Validators.required);
  // --
  
  exerciseForm: FormGroup;

  constructor() {
    this.exerciseForm = new FormGroup({
      name: new FormControl(this.exercise.name, Validators.required),
      description: new FormControl(this.exercise.description, Validators.required),
      reps:  new FormControl(this.exercise.reps, Validators.required),
      videoUrl: new FormControl(this.exercise.videoUrl, Validators.required)
    });
  }

  ngOnInit() {
    // Iniciando valores dos form
    this.exerciseForm.patchValue({
      name: this.exercise.name,
      description: this.exercise.description,
      reps: this.exercise.reps,
      videoUrl: this.exercise.videoUrl
    });
        
    // Define o valor dos selects quando o componente é inicializado
    this.intensityControl.setValue(this.exercise.intensity);
    this.jointControl.setValue(this.exercise.joint);
    // --

    // Escuta as mudanças nas controls dos selects e atualiza o objeto exercise.
    this.intensityControl.valueChanges.subscribe((value) => {
      this.exercise.intensity = value;
      console.log(value)
    });
    this.jointControl.valueChanges.subscribe((value) => {
      this.exercise.joint = value;
      console.log(value)
    });
    // --
  }

  save() {
    this.exerciseForm.markAllAsTouched();

      // Verifica se todos os campos obrigatorios estao preenchidos
      if (!this.exercise.name || !this.exercise.description || !this.exercise.reps || !this.exercise.videoUrl || !this.intensityControl.value || !this.jointControl.value) {
          return;
      }
    this.return.emit(this.exercise);
  }


  get name() {
    return this.exerciseForm.get('name');
  }

  get description() {
    return this.exerciseForm.get('description');
  }

  get reps() {
    return this.exerciseForm.get('reps');
  }

  get videoUrl() {
    return this.exerciseForm.get('videoUrl');
  }

}
