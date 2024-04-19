import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {   MatChipInputEvent,
  MatChipEditedEvent,
  MatChip,MatChipsModule } from '@angular/material/chips';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { tag } from "../../tag";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,MatDialogModule,ReactiveFormsModule,MatSliderModule,MatChipsModule,MatChip,MatIconModule],
  templateUrl: './Rigister.component.html',
  styleUrl: './Rigister.component.css'
})
export class AboutComponent implements OnInit {
  registrationForm!: FormGroup;
  imageURL: string | ArrayBuffer | null = '';
  showForm: boolean = false;
  maxFileSize: number = 1 * 1024 * 1024; // 1 MB
  maxImageWidth: number = 310;
  maxImageHeight: number = 325;
  imagePreview!: string;
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

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) { }

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
      profileImage: ['', [Validators.required,
        this.validateImageSizeAndDimensions.bind(this)
      ]],
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
      age: ['' ,Validators.required],
      addressType: ['home',Validators.required],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      tags: [[], Validators.required],
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
      // Read the file using FileReader
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const img = new Image();
        this.imagePreview = reader.result as string;
        img.src = reader.result as string;
  
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          
          // Check image dimensions
          if (width > 310 || height > 325) {
            this.registrationForm.get('profileImage')?.setErrors({ invalidImageDimensions: true });
          } else {
            this.registrationForm.get('profileImage')?.setErrors(null);
          }
        };
  
        // Check image size
        if (file.size > 1024 * 1024) { // 1 MB in bytes
          this.registrationForm.get('profileImage')?.setErrors({ invalidImageSize: true });
        } else {
          this.registrationForm.get('profileImage')?.setErrors(null);
        }
      };
  
      // Update the image URL
      const fakePath: string = event.target.value;
      const imageName: string = fakePath.split('\\').pop() || '';
      this.imageURL = this.commonService.generateImagePath(imageName);
      const fullPath = this.commonService.folderPath + imageName;
      this.registrationForm.patchValue({
        profileImage: fullPath
      });
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

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: tag[] = [{ name: 'Hockey' }];

  announcer = Inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }


  validateImageSizeAndDimensions(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File;
  
    // If no file is selected, return null (no validation error)
    if (!file) {
      return null;
    }
  
    const reader = new FileReader();
  
    reader.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
  
        // Check image dimensions
        if (width > 310 || height > 325) {
          control.setErrors({ invalidImageDimensions: true });
        } else {
          control.setErrors(null);
        }
      };
      img.src = event.target.result;
    };
  
    // Read the file as a data URL
    reader.readAsDataURL(file);
  
    return null;
  }
}  