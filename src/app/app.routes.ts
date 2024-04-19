import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AboutComponent } from './components/Rigister/Rigister.component';
import { NewComponent } from './components/new/new.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomepageComponent },
    { path: 'User', component: UserProfileComponent },
    { path: 'rigister', component: AboutComponent },
    {path:'new',component:NewComponent}
];
