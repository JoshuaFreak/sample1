import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FCM } from '@ionic-native/fcm';
// import { HomePage } from '../pages/home/home';

import { ShoppingListService } from './../services/shopping-list/shopping-list.service';
import { ToastService } from '../services/toast/toast.service';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RestProvider } from '../providers/rest/rest';
import { LoginProvider } from '../providers/login/login';
import { ShowLogProvider } from '../providers/show-log/show-log';

@NgModule({
  declarations: [
    MyApp,
    // HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    SQLite,
    FCM,
    ToastService,
    RemoteServiceProvider,
    RestProvider,
    LoginProvider,
    ShowLogProvider,
  ]
})
export class AppModule {

  constructor(private sqlite: SQLite, public toast: ToastService) { 
  }

  
}
