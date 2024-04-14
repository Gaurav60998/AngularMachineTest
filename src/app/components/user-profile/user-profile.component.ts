import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userdata: any[] = [];
  editForm!: FormGroup;
  isEditing: boolean = false;
  userId: any; // Add userId property to store the user ID

  constructor(private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loaduser();
    this.createEditForm();
  }

  loaduser() {
    this.commonService.GetAllUsers().subscribe((res: any) => {
      this.userdata = res;
    });
  }
  

  createEditForm() {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      // Add other form controls for age, state, country, address, tags, subscribeToNews
    });
  }

  editProfile(user: any) {
    this.isEditing = true;
    this.userId = user.id; // Store the user ID
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // Patch other form controls with user data
    });
  }

  submitForm() {
    if (this.editForm.invalid) {
      return;
    }

    const updatedUserData = {
      firstName: this.editForm.get('firstName')?.value,
      lastName: this.editForm.get('lastName')?.value,
      email: this.editForm.get('email')?.value,
      phoneNumber: this.editForm.get('phoneNumber')?.value,
      // Include other fields that need to be updated
    };
  
    if (!updatedUserData.firstName || !updatedUserData.lastName || !updatedUserData.email || !updatedUserData.phoneNumber) {
      console.error('Invalid user data');
      return;
    }
    this.commonService.EditUser(this.userId, updatedUserData).subscribe(
      (response) => {
        console.log('User data updated successfully:', response);
        this.isEditing = false;
        // Optionally, you can reload user data or perform other actions
      },
      (error) => {
        console.error('Error updating user data:', error);
        // Handle error
      }
    );
  }

  cancelEdit() {
    this.isEditing = false;
  }
}