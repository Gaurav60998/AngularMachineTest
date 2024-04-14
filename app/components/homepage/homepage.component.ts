import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { RigisterFormComponent } from '../rigister-form/rigister-form.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,MatIconModule,NavbarComponent,RigisterFormComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
