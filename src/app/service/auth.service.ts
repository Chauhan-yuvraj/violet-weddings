import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../interface/user-auth';

// interface IUser {
//   id?: string;
//   contactNumber: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // existinguser$ = new BehaviorSubject<boolean | null>(null);
  private baseURL =
    'https://violet-weddings-41ce3-default-rtdb.asia-southeast1.firebasedatabase.app/';

  user!: IUser;
  constructor(private http: HttpClient, private route: Router) {}

  signUp(userDetails: IUser) {
    return this.http.post(`${this.baseURL}user.json`, userDetails);
  }

  numberVerify(
    contactNumber: string | undefined
  ): Observable<IUser | undefined> {
    return this.http
      .get<{ [key: string]: IUser }>(`${this.baseURL}user.json`)
      .pipe(
        map((users) => {
          // if (!users) return false;
          const keys = Object.keys(users);
          let user: IUser | undefined;
          keys.forEach((k) => {
            if (users[k].contactNumber === contactNumber) {
              user = { ...users[k], id: k };
              this.user = user;
              console.log('ths user ', user);

              localStorage.setItem('user', JSON.stringify(this.user));
            } else {
              user = { ...users[k], id: k };
              localStorage.setItem('user', JSON.stringify(this.user));
            }
          });
          return user;
        })
      );
  }
  updateUser(userId: string, updatedData: Partial<IUser>): Observable<void> {
    return this.http.patch<void>(
      `${this.baseURL}user/${userId}.json`,
      updatedData
    );
  }

  // get getExistingUser(){
  //   return this.user
  // }
}
