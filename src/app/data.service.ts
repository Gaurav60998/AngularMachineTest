import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  registrationForm: any;
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
          Validators.maxLength(20),
        ],
      ],
      lastname: [],
      email: ['', Validators.required],
      phoneNo: [''],
      addressType: ['home'], // default value
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      tags: [''],
    });
  }
}
