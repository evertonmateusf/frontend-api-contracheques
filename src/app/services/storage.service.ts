import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/config/storage_keys.config';
import { LocalUserDto } from '../models/localUser.dto';

@Injectable()
export class StorageService {

  getLocalUser(): LocalUserDto {
    const usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUserDto) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

}
