import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-in-by-number',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in-by-number.component.html',
  styleUrl: './sign-in-by-number.component.scss',
})
export class SignInByNumberComponent implements OnInit {
  countyCode = '+91';
  form = new FormGroup({
    usernumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ],
    }),
  });

  get userNumberInvalid() {
    return (
      this.form.controls.usernumber.touched &&
      this.form.controls.usernumber.dirty &&
      this.form.controls.usernumber.invalid
    );
  }

  get errorMessage(): string {
    const control = this.form.controls.usernumber;
    if (control.hasError('required')) {
      return 'Phone number is required';
    } else if (
      control.hasError('pattern') ||
      control.hasError('minlenght') ||
      control.hasError('maxlength')
    ) {
      return 'Enter 10-digit Mobile Number';
    } else {
      return '';
    }
  }

  existingUser: boolean | null = null;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const userNumber = this.form.value.usernumber?.toString();
    if (userNumber)
      this.service.numberVerify(userNumber).subscribe({
        next: (user) => {
          if (user && user.password !== '') {
            this.existingUser = true;
          } else if (user?.contactNumber == userNumber && user.password == '') {
            console.log('User Number Already Exsits ');
            console.log(user);
            
            this.router.navigate(['/enterDetails']);
          } else {
            console.log('new user created');

            this.service
              .signUp({
                contactNumber: userNumber,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
              })
              .subscribe();

            this.router.navigate(['/enterDetails']);
          }
        },
      });
  }
}
