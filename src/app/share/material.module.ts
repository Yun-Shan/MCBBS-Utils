import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule, MatSlideToggleModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatRadioModule,
  MatFormFieldModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatTooltipModule,
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class MaterialModule {
}
