import { Component, OnInit } from '@angular/core';

import { BucketlistService } from "../../../../services/bucketlist.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { isUndefined } from "util";

@Component({
  selector: 'app-new-bucketlist',
  templateUrl: './new-bucketlist.component.html',
  styleUrls: ['./new-bucketlist.component.css']
})
export class NewBucketlistComponent implements OnInit {
  message: string = null;
  payload: any = {};
  loading: boolean = true;

  constructor(
    private router: Router,
    private bucketlistService: BucketlistService,
    public toast: ToastsManager
  ) { }

  ngOnInit() {
    this.loading = false;
  }

  createBucketlist () {
    this.loading = true;
    if (this.validateFields()) {
      this.bucketlistService.create(this.payload.name).subscribe(
        successMessage => {
          this.toast.success(successMessage);
          this.router.navigate(['/bucketlists']);
        },
        errorMessage => {
          this.toast.error(errorMessage);
        }
      );
    } else {
      this.toast.error('Bucketlist name is required.');
    }
    this.loading = false;
  }

  private validateFields() {
    return !isUndefined(this.payload.name);
  }
}
