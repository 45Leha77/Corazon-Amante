import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FirebaseImage } from '../../model/firebase-image.interface';

@Component({
  selector: 'app-images-handler',
  templateUrl: './images-handler.component.html',
  styleUrls: ['./images-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ImagesHandlerComponent {
  @Input() images: FirebaseImage[] = [];
  @Output() addImage = new EventEmitter<FileList>();
  @Output() deleteImage = new EventEmitter<string>();

  protected file: FileList | null = null;

  protected upload(event: Event): void {
    this.file = (event.target as HTMLInputElement).files as FileList;
  }

  protected onAddImage(): void {
    if (!this.file) {
      return;
    }
    this.addImage.emit(this.file);
  }

  protected onDeleteImage(path: string): void {
    this.deleteImage.emit(path);
  }
}
