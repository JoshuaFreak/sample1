import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceHistoryPage } from './attendance-history';

@NgModule({
  declarations: [
    AttendanceHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceHistoryPage),
  ],
})
export class AttendanceHistoryPageModule {}
