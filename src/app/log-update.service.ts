import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {

  public update: boolean;

  constructor(updates: SwUpdate, snackBar: MatSnackBar) {
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this.update = true;
      snackBar.open('新版本下载完毕，是否立即更新', '更新', {
        duration: 7777
      }).onAction().subscribe(res => {
        console.log(res);
        location.reload();
      });
    });
  }

  noOp() {
  }
}
