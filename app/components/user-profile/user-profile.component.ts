import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  {
  userdata:any[]=[];
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.loaduser();
  }
   loaduser(){
    this.http.get("assets/user.json").subscribe((res:any)=>{
     this.userdata=res.data;
    })
   }
}
