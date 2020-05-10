import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ReadingDirection = 'ltr' | 'rtl';

@Injectable({ providedIn: 'root' })
export class OrintationService {

  public Direction: ReadingDirection = 'rtl';
  constructor(@Inject(DOCUMENT) private doc) {}

  public setReadingDirection(dir: ReadingDirection) {
    this.doc.dir = dir;
    this.Direction = dir;
  }
}