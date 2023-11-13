import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { UserAjaxService } from 'src/app/service/user.ajax.service.service';

@Component({
  selector: 'app-admin-user-plist-routed',
  templateUrl: './admin-user-plist-routed.component.html',
  styleUrls: ['./admin-user-plist-routed.component.css']
})
export class AdminUserPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oUserAjaxService: UserAjaxService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oUserAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " users", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating users: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty() {
    this.oUserAjaxService.empty().subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " users", '', { duration: 2000 });
        this.bLoading = false;
        this.forceReload.next(true);
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error emptying users: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

}
