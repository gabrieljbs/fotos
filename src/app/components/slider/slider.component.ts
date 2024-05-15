import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {
  public slideUrls: any;
  public isLoading = true;
  constructor(private photoService: PhotosService) {
    this.isLoading = true;
    this.loadSlideUrls();
  }

  async loadSlideUrls() {
    try {
      this.slideUrls = await this.photoService.getPhotos('slides/');
      this.isLoading = false;
    } catch (error) {
      console.error('Erro ao carregar URLs do slide:', error);
    }
  }
}
