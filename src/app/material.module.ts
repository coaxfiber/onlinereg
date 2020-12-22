import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';import {
    MatNativeDateModule
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio'

@NgModule({
  imports: [MatButtonModule, MatToolbarModule,MatIconModule,MatCardModule,MatStepperModule,
  MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,MatSelectModule,
  MatCheckboxModule,MatListModule,MatGridListModule,MatSidenavModule,MatExpansionModule,
  MatMenuModule,MatTabsModule,MatDialogModule,MatProgressSpinnerModule,MatDatepickerModule,
  MatNativeDateModule,MatProgressBarModule,MatAutocompleteModule,MatSnackBarModule,MatChipsModule,
  MatRadioModule
  ],
  exports: [MatButtonModule, MatToolbarModule,MatIconModule,MatCardModule,MatStepperModule,
  MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,MatSelectModule,
  MatCheckboxModule,MatListModule,MatGridListModule,MatSidenavModule,MatExpansionModule,
  MatMenuModule,MatTabsModule,MatDialogModule,MatProgressSpinnerModule,MatDatepickerModule,
  MatNativeDateModule,MatProgressBarModule,MatAutocompleteModule,MatSnackBarModule,MatChipsModule,
  MatRadioModule
  ],
})
export class MaterialModule { }