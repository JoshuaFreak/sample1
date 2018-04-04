import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowLogPage } from './show-log';

@NgModule({
  declarations: [
    ShowLogPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowLogPage),
  ],
})
export class ShowLogPageModule {}
