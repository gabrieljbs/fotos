import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'',component: HomeComponent}
];
