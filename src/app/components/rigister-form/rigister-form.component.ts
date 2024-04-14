import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DataService } from '../../data.service'; 
import { CommonService } from '../../common.service'; 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-rigister-form',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSliderModule, RouterModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './rigister-form.component.html',
  styleUrl: './rigister-form.component.css'
})
export class RigisterFormComponent {
  regForm: FormGroup;
  selectedFile: File | null = null;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private commonService: CommonService
  ) {
    this.regForm = this.dataService.registrationForm;
  
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
    if (!this.firstName || !this.lastName || !this.email || !this.phoneNumber || !this.state || !this.country || !this.address) {
      alert('Please fill in all required fields.');
        return; 
    }
    const profileImageUrl = 'https://up.yimg.com/ib/th?id=OIP.eeZ3jfS4et6eKUi1je3mxwHaHa&%3Bpid=Api&rs=1&c=1&qlt=95&w=124&h=124';
    // Send data to the server
    const formData = {
      profileImage: profileImageUrl,
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

    const subscription: Subscription = this.commonService.AddUpdateUser(formData).subscribe({
      next: (response) => {
        console.log('Data submitted successfully:', response);
        // Handle success
        this.router.navigateByUrl('/User');
      },
      error: (error) => {
        console.error('Error submitting data:', error);
        // Handle error
      }
    });
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