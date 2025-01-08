import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in-by-number',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-by-number.component.html',
  styleUrl: './sign-in-by-number.component.scss',
})
export class SignInByNumberComponent {
  form = new FormGroup({
    usernumber: new FormControl(),
  });

  onSubmit() {
    // console.log(this.form);
    const userNumber = this.form.value.usernumber;
  }
}
