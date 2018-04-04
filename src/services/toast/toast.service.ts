import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
    constructor(private toastCtl: ToastController){}

    show(message: string, duration: number = 3000){
        return this.toastCtl
            .create({
                message,
                duration,
            })
            .present();
    }
}