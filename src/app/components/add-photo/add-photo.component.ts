import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PhotosService } from '../../services/photos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.scss',
})
export class AddPhotoComponent {
  public btn = false;
  public imageSrc: any = './../../../assets/photo.png';
  private img:any;
  public isLoading = false
  constructor(private photoService: PhotosService){}

  addPhoto() {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput.click(); 
  }

  handleEvent(event: any) {
    this.img = event.target.files[0]; 
    this.imageSrc = event.target as HTMLInputElement;
    this.showPreview(this.imageSrc.files[0]);
    this.btn = true;
  }

  showPreview(imagem: any){
    this.isLoading = true
    const reader = new FileReader();
    reader.onload = (event) => {
      this.imageSrc = (event.target as FileReader).result;
    };
    reader.readAsDataURL(imagem);
    this.isLoading = false
  }

  savePhoto(){
    this.photoService.uploadPhoto(this.img);
    this.btn = false;
    this.imageSrc = './../../../assets/photo.png'
    this.photoService.updatePhotos()
  }
}


