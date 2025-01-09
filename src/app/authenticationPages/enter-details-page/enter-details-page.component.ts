import { Component, DestroyRef, inject, Injector, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, first } from 'rxjs';

@Component({
  selector: 'app-enter-details-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './enter-details-page.component.html',
  styleUrl: './enter-details-page.component.scss',
})
export class EnterDetailsPageComponent implements OnInit {
  private destRef = inject(DestroyRef);
  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
  });

  get firstNameInvalid() {
    return (
      this.form.controls.firstName.touched &&
      this.form.controls.firstName.dirty &&
      this.form.controls.firstName.invalid
    );
  }
  get lastNameInvalid() {
    return (
      this.form.controls.lastName.touched &&
      this.form.controls.lastName.dirty &&
      this.form.controls.lastName.invalid
    );
  }
  get emailInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadForm = JSON.parse(savedForm);

      this.form.patchValue({
        firstName: loadForm.firstName,
        lastName: loadForm.lastName,
        email: loadForm.email,
      });
    }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({
              firstName: value.firstName,
              lastName: value.lastName,
              email: value.email,
            })
          );
        },
      });

    this.destRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    const firstName = this.form.value.firstName;
    const lastName = this.form.value.lastName;
    const email = this.form.value.email;
  }
}
