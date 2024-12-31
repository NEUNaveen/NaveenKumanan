import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  myForm!: FormGroup; // Declare a FormGroup

  constructor(private fb: FormBuilder, private router: Router, private userservice: UserService) {} // Inject FormBuilder

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(this.myForm.value); // Log form values on submission
    this.userservice.addUser(this.myForm.value).subscribe({
      next: (response) => console.log('User saved:', response),
      error: (err) => console.error('Error saving user:', err)
    });

    this.router.navigate(['home']);
  }
}
