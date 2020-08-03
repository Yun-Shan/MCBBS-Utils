import { NgModule } from '@angular/core';

import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationRobotComponent } from './validation-robot/validation-robot.component';
import { ValidationResultComponent } from './validation-result/validation-result.component';
import { SharedModule } from '../share/shared.module';


@NgModule({
  declarations: [
    ValidationRobotComponent,
    ValidationResultComponent
  ],
  imports: [
    SharedModule,
    ValidationRoutingModule
  ]
})
export class ValidationModule {
}
