import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RigisterFormComponent } from './components/rigister-form/rigister-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomepageComponent },
    { path: 'rigister', component: RigisterFormComponent },
    { path: 'User', component: UserProfileComponent }
];
