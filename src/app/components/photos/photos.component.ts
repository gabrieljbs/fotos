import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class PhotosComponent implements OnInit, OnDestroy {
  public imagesUrl: any[] = [];
  public isLoading = true;
  private photoUpdate!: Subscription;

  constructor(private photoService: PhotosService) {}

  ngOnInit() {
    this.photoUpdate = this.photoService.photoUpdated$.subscribe(() => {
      this.updatePhotos();
    });
    this.updatePhotos();
  }

  ngOnDestroy() {
    this.photoUpdate.unsubscribe();
  }

  private async updatePhotos() {
    this.isLoading = true;
    try {
      const items = await this.photoService.getPhotos('myPhotos/');
      this.imagesUrl = items;
    } catch (error) {
      console.error('Erro ao obter fotos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async delete(file: any) {
    try {
      await this.photoService.deletePhoto(file);
      this.imagesUrl = this.imagesUrl.filter((item) => item.name !== file);
    } catch (error) {
      console.error('Erro ao deletar a Photo:', error);
    }
  }
}
