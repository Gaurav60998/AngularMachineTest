import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-rigister-form',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSliderModule],
  templateUrl: './rigister-form.component.html',
  styleUrl: './rigister-form.component.css'
})
export class RigisterFormComponent {
  regForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.regForm = this.fb.group({
      profileImage: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      age: [20, Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      addressType: ['', Validators.required],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      tags: [''],
      subscribe: [false]
    });
  }
  showForm: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  state: string = '';
  country: string = '';
  address: string = '';
  subscribeToNews: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }
  onFileSelected(event: any) {
    // Your file handling logic here
  }
  selectedvalue=25;
  startvalue=30;
  endvalue=70;
  age: number = 20; 
  submitForm() {
    // Handle form submission logic here
    console.log('Form Submitted:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      state: this.state,
      country: this.country,
      address: this.address,
      subscribeToNews: this.subscribeToNews
    });
    this.toggleForm(); // Close the form after submission
  }
  

  cancelForm() {
    // Reset form fields and close the form
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.state = '';
    this.country = '';
    this.address = '';
    this.subscribeToNews = false;
    this.toggleForm();
  }
  tags: string[] = [];
tagsInput: string = '';

addTag() {
  if (this.tagsInput.trim() !== '' && !this.tags.includes(this.tagsInput.trim())) {
    this.tags.push(this.tagsInput.trim());
    this.tagsInput = '';
  }
}

removeTag(tag: string) {
  this.tags = this.tags.filter(t => t !== tag);
}


}