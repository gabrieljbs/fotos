import { Component, OnInit } from '@angular/core';
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
export class PhotosComponent implements OnInit {
  public imagesUrl: any [] = [];
  public isLoading = true;

  constructor(private photoService: PhotosService) {}
  async ngOnInit() {
    await this.photoService.getPhotos('myPhotos/').then((item: any) => {
      this.imagesUrl = item;
      this.isLoading = false;
    });
    
  }

  async delete(file: any) {
    try {
      await this.photoService.deletePhoto(file);
      this.imagesUrl = this.imagesUrl.filter(item => item.name !== file);
    } catch (error) { 
      console.error('Erro ao deletar a Photo:', error);
    }
  }
}
