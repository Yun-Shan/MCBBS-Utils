import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-validation-result',
  templateUrl: './validation-result.component.html',
  styleUrls: ['./validation-result.component.scss']
})
export class ValidationResultComponent implements OnInit {

  tid = 0;
  loading = true;
  success = false;
  data: any;
  dataJson: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private validationService: ValidationService) {
    const tidStr = this.activatedRoute.snapshot.paramMap.get('tid');
    if (tidStr) {
      this.tid = parseInt(tidStr, 10);
    }
    if (this.tid > 0) {
      this.validationService.getThread(this.tid)
        .then(res => {
          if (res) {
            this.data = res;
            this.dataJson = JSON.stringify(res);
            this.success = true;
          } else {
            this.success = false;
          }
          this.loading = false;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }, _ => {
          this.success = false;
          this.loading = false;
        });
    } else {
      this.success = false;
      this.loading = false;
    }
  }

  ngOnInit(): void {
  }

}
