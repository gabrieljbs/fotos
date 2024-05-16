import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  getDownloadURL,
  listAll,
  uploadBytes,
  deleteObject,
} from '@angular/fire/storage';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private photoUpdatedSource = new Subject<void>();
  photoUpdated$ = this.photoUpdatedSource.asObservable();
  
  updatePhotos() {
    this.photoUpdatedSource.next();
  }

  constructor(private storage: Storage) {}

  async uploadPhoto(file: any) {
    const storageRef = ref(this.storage, 'myPhotos/' + file.name);
    await uploadBytes(storageRef, file).then((res) => {});
  }

  async getPhotos(folder: string): Promise<string[]> {
    let fileName:any = ''
    fileName = folder
    const photo: any = [];
    const storageRef = ref(this.storage, fileName);
    const listResult = await listAll(storageRef);
    await Promise.all(
      listResult.items.map(async (item) => {
        const url = await getDownloadURL(ref(storageRef, item.name));
        photo.push({ url: url, name: item.name });
      })
    );
    return photo;
  }

  async deletePhoto(file: any) {
    const storageRef = ref(this.storage, 'myPhotos/' + file);
    deleteObject(storageRef)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
}
