
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,MatDialogModule,ReactiveFormsModule,MatSliderModule,MatChipsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  registrationForm!: FormGroup;
  separatorKeysCodes: number[] = [13, 188];
  addOnBlur = true;
  imageURL: string | ArrayBuffer | null = '';
  showForm: boolean = false;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router,) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      profileImage: [''],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.maxLength(20)]],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      age: [''],
      addressType: ['home'],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      tags: [''],
      subscribeToNewsletter: [false]
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  onCancel() {
    this.toggleForm(); // Toggle the form visibility
    this.registrationForm.reset(); // Reset the form values
    this.imageURL = ''; // Clear the image preview
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.registrationForm.patchValue({
        profileImage: file
      });
      this.registrationForm.get('profileImage')?.updateValueAndValidity();

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      // Call the service method to add/update user
      this.commonService.AddUpdateUser(userData).subscribe(
        (response: any) => {
          console.log('User added/updated successfully:', response);
          // Optionally, perform any other actions upon successful submission
          this.router.navigateByUrl('/User');
        },
        (error: any) => {
          console.error('Error adding/updating user:', error);
          // Optionally, handle errors
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

  formatLabel(value: number) {
    return value + ' years';
  }

  add(event: any) {
    // Add tag logic here
  }
}