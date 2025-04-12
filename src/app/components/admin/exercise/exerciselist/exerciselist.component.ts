import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise, Intensity, IntensityPTBR, Joint, JointPTBR } from '../../../../models/exercise';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-exerciselist',
  standalone: true,
  imports: [MdbModalModule],
  templateUrl: './exerciselist.component.html',
  styleUrl: './exerciselist.component.scss',
})
export class ExerciselistComponent {
  @Input('exercises') exercises: Exercise[] = [];
  @Output('edit') editEvent = new EventEmitter<Exercise>();
  @Output('delete') deleteEvent = new EventEmitter<number>();
  @Output('new') newEvent = new EventEmitter<any>();
  
    edit(exercise: Exercise){
      this.editEvent.emit(exercise);
    }

    new(){
      this.newEvent.emit();
    }

    delete(id: number){
      let index = this.exercises.findIndex(x =>{ return x.id == id} );
      this.exercises.splice(index, 1);
    
      this.deleteEvent.emit(id);
    }

    getJointPTBR(joint: Joint | null): string {
      return JointPTBR[joint as keyof typeof JointPTBR];
    }
    getIntensityPTBR(intensity: Intensity | null): string {
      return IntensityPTBR[intensity as keyof typeof IntensityPTBR];
    }

}
