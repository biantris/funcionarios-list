import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from "rxjs";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  title = 'imagem';
  constructor(private storage: AngularFireStorage) { }

  UploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'imagem';
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

  }

}
