import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  checkUserExists(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(username !== 'taras');
      }, 1000);
    });
  }
}
