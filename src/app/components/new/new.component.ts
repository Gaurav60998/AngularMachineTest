
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      profileImage: [''], // Remove any validators related to the profile image
      company: ['', Validators.required],
      jobExperience: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      // Your logic to add the employee
      console.log('Employee added:', employeeData);
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}