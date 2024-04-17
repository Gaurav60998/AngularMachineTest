
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,MatDialogModule,ReactiveFormsModule,MatSliderModule,MatChipsModule],
  templateUrl: './Rigister.component.html',
  styleUrl: './Rigister.component.css'
})
export class AboutComponent implements OnInit {
  registrationForm!: FormGroup;
  separatorKeysCodes: number[] = [13, 188];
  addOnBlur = true;
  imageURL: string | ArrayBuffer | null = '';
  showForm: boolean = false;
  maxImageSize: number = 100 * 1024;
   userData: any = {};
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

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router, private imageCompress: NgxImageCompressService) { }

  get country() {
    return this.registrationForm.get('country');
  }

  get state() {
    return this.registrationForm.get('state');
  }
  onCountryChange() {
    // Reset state value when country changes
    this.state?.setValue('');
  }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      profileImage: ['', [Validators.required, this.validateImageSize.bind(this)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+\d{1,2}\s?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/
          ),
        ],
      ],
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
    this.setProfileImage(this.userData.profileImage);
  }
  setProfileImage(imageName: string): void {
    this.imageURL = this.commonService.generateImagePath(imageName);
    // Set the form control value with the full image path
    this.registrationForm.patchValue({
      profileImage: this.imageURL
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
}

  onCancel() {
    this.toggleForm();
    this.registrationForm.reset();
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
      this.registrationForm.patchValue({
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

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.commonService.AddUpdateUser(userData).subscribe(
        (response: any) => {
          console.log('User added/updated successfully:', response);
          this.router.navigateByUrl('/User');
        },
        (error: any) => {
          console.error('Error adding/updating user:', error);
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

  validateImageSize(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File;
  
    // If no file is selected, return null (no validation error)
    if (!file) {
      return null;
    }
  
    // Check image size only if a file is selected
    if (file.size > this.maxImageSize) {
      return { invalidImageSize: true };
    }
    return null;
  }
}