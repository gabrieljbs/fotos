import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { AddPhotoComponent } from '../../components/add-photo/add-photo.component';
import { PhotosComponent } from '../../components/photos/photos.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SliderComponent, AddPhotoComponent, PhotosComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
