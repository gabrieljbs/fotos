import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PhotosService } from '../../services/photos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent {
  public imagesUrl: any[] = [];
  public isLoading = true;
  constructor(private photoService: PhotosService) {
    this.getPhotos();
  }

  async getPhotos() {
    try {
      this.imagesUrl = await this.photoService.getPhotos('myPhotos/');
    } catch (error) {
      console.error('Erro ao carregar URLs de Photo:', error);
    }
    this.isLoading = false;
  }

  async delete(file: any) {
    try {
      await this.photoService.deletePhoto(file);
      await this.getPhotos();
    } catch (error) {
      console.error('Erro ao deletar a Photo:', error);
    }
  }
}
