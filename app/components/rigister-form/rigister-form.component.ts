import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";


@Component({
  selector: 'app-rigister-form',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSliderModule, RouterModule,HttpClientModule],
  templateUrl: './rigister-form.component.html',
  styleUrl: './rigister-form.component.css'
})
export class RigisterFormComponent {
  regForm: FormGroup;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private router: Router ,private http:HttpClient) {
    this.regForm = this.fb.group({
      profileImage: [''],
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      age: [this.selectedvalue, Validators.required],
      state: this.state,
      country: this.country,
      address: this.address,
      tag:this.tag,
      subscribeToNews: this.subscribeToNews
    });
  }
  showForm: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  age:  string = '';
  state: string = '';
  country: string = '';
  address: string = '';
  tag:string='';
  subscribeToNews: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }
  onFileSelected(event: any) {
    // Get the selected file
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
  selectedvalue='25';
  submitForm() {
    // Check if any required field is blank
    if (!this.firstName || !this.lastName || !this.email || !this.phoneNumber || !this.state || !this.country || !this.address) {
        console.error('Please fill in all required fields.');
        return; // Stop the submission process
    }

    // Handle form submission logic here
    console.log('Form Submitted:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        age: this.selectedvalue,
        state: this.state,
        country: this.country,
        address: this.address,
        tag:this.tag,
        subscribeToNews: this.subscribeToNews
    });

    // Send data to the server
    const formData = {
        profileImage: "",
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        age: this.selectedvalue,
        state: this.state,
        country: this.country,
        address: this.address,
        tag:this.tag,
        subscribeToNews: this.subscribeToNews
    };

    this.http.post('http://localhost:3000/signup', formData).subscribe(
        (response) => {
            console.log('Data submitted successfully:', response);
            // Handle success
            this.router.navigateByUrl('/User');
        },
        (error) => {
            console.error('Error submitting data:', error);
            // Handle error
        }
      );
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




}