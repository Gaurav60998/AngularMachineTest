import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';
import { AboutComponent } from '../Rigister/Rigister.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../user.interface';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule,CommonModule,FormsModule,ReactiveFormsModule,MatSliderModule,AboutComponent,MatDialogModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user:User | undefined; 
  imageURL: string | ArrayBuffer | null = '';
  maxImageSize: number = 100 * 1024;
  editForm!: FormGroup;
  isEditing: boolean = false;
  userId: any;
  countries = [
    'India',
    'United States of America',
    'France',
    'China',
    'Brazil',
    'Germany',
    'Russia',
    'Canada',
    'Australia',
  ]; // Sample countries data
  states: { [key: string]: string[] } = {
    India: [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
    ],
    'United States of America': [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ],
    Canada: [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Nova Scotia',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Northwest Territories',
      'Nunavut',
      'Yukon',
    ],
    Australia: [
      'New South Wales',
      'Victoria',
      'Queensland',
      'Western Australia',
      'South Australia',
      'Tasmania',
      'Australian Capital Territory',
      'Northern Territory',
    ],
    Brazil: [
      'Acre',
      'Alagoas',
      'Amapá',
      'Amazonas',
      'Bahia',
      'Ceará',
      'Espírito Santo',
      'Goiás',
      'Maranhão',
      'Mato Grosso',
      'Mato Grosso do Sul',
      'Minas Gerais',
      'Pará',
      'Paraíba',
      'Paraná',
      'Pernambuco',
      'Piauí',
      'Rio de Janeiro',
      'Rio Grande do Norte',
      'Rio Grande do Sul',
      'Rondônia',
      'Roraima',
      'Santa Catarina',
      'São Paulo',
      'Sergipe',
      'Tocantins',
    ],
    China: [
      'Anhui',
      'Fujian',
      'Gansu',
      'Guangdong',
      'Guizhou',
      'Hainan',
      'Hebei',
      'Heilongjiang',
      'Henan',
      'Hubei',
      'Hunan',
      'Jiangsu',
      'Jiangxi',
      'Jilin',
      'Liaoning',
      'Qinghai',
      'Shaanxi',
      'Shandong',
      'Shanxi',
      'Sichuan',
      'Yunnan',
      'Zhejiang',
      'Taiwan', // Considered as a part of China
      'Hong Kong', // Special Administrative Region of China
      'Macau', // Special Administrative Region of China
    ],
    Russia: [
      'Central Federal District',
      'Southern Federal District',
      'Northwestern Federal District',
      'Far Eastern Federal District',
      'Siberian Federal District',
      'Ural Federal District',
      'Volga Federal District',
    ],
    Germany: [
      'Baden-Württemberg',
      'Bavaria',
      'Berlin',
      'Brandenburg',
      'Bremen',
      'Hamburg',
      'Hesse',
      'Lower Saxony',
      'Mecklenburg-Vorpommern',
      'North Rhine-Westphalia',
      'Rhineland-Palatinate',
      'Saarland',
      'Saxony',
      'Saxony-Anhalt',
      'Schleswig-Holstein',
      'Thuringia',
    ],
    France: [
      'Auvergne-Rhône-Alpes',
      'Bourgogne-Franche-Comté',
      'Brittany',
      'Centre-Val de Loire',
      'Corsica',
      'Grand Est',
      'Hauts-de-France',
      'Île-de-France',
      'Normandy',
      'Nouvelle-Aquitaine',
      'Occitanie',
      'Pays de la Loire',
      "Provence-Alpes-Côte d'Azur",
    ],
  };


  constructor(private commonService: CommonService, private fb: FormBuilder, public dialog: MatDialog) { }
  get country() {
    return this.editForm.get('country');
  }

  get state() {
    return this.editForm.get('state');
  }
  onCountryChange() {
    // Reset state value when country changes
    this.state?.setValue('');
  }
 
  ngOnInit(): void {
    this.createEditForm();
    this.loadLatestUser();
    this.commonService.getLatestUser().subscribe(user => {
      this.user = user;
    });
  }

  loadLatestUser() {
    this.commonService.getLatestUser().subscribe(user => {
      this.user = user;
      this.userId = user.id; // Assuming user object has an 'id' property
      this.populateEditForm();
    });
  }
  populateEditForm() {
    if (this.user) {
      this.editForm.patchValue({
        profileImage: this.user.profileImage,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phoneNo: this.user.phoneNo,
        country: this.user.country,
        state: this.user.state,
        age: this.user.age,
        addressType: this.user.addressType,
        address1: this.user.address1,
        address2: this.user.address2,
        companyAddress1: this.user.companyAddress1,
        companyAddress2: this.user.companyAddress2,
      });
    }
  }

  createEditForm() {
    this.editForm = this.fb.group({
      profileImage: ['', [Validators.required, this.validateImageSize.bind(this)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      age: [''],
      addressType: ['home'],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  formatLabel(value: number) {
    return value + ' years';
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Extract the file name from the fake path
      const fakePath: string = event.target.value;
      const imageName: string = fakePath.split('\\').pop() || '';

      // Update the image URL with the correct path
      this.imageURL = this.commonService.generateImagePath(imageName);

      // Optionally, you can also update the profileImage field in the form
      const fullPath = this.commonService.folderPath + imageName;
      this.editForm.patchValue({
        profileImage: fullPath
      });
    }
  }

  uploadImageToServer(imageFile: File) {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile, 'avatar.png'); // Replace 'avatar.png' with the correct file name
      this.commonService.uploadImage(formData).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
        },
        (error: any) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  submitForm() {
    if (this.editForm.valid) {
      const updatedUserData = this.editForm.value;
      this.commonService.EditUser(this.userId, updatedUserData).subscribe(
        (response: any) => {
          console.log('User updated successfully:', response);
          this.isEditing = false;
          this.editForm.reset();
          this.loadLatestUser(); // Reload latest user data after update
        },
        (error: any) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

  validateImageSize(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File;

    if (!file) {
      return null;
    }

    if (file.size > this.maxImageSize) {
      return { invalidImageSize: true };
    }
    return null;
  }
}