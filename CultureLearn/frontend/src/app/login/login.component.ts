import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users: any;
  myForm!: FormGroup; // Declare a FormGroup

  constructor(private fb: FormBuilder, private router: Router, private userservice: UserService) {} // Inject FormBuilder

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });

    this.userservice.getUsers().subscribe((data) => {
      this.users = data;
      console.log('Users:', this.users);
    });
  }

  onSubmit(): void {
    console.log(this.myForm.value); // Log form values on submission

    if(this.users.find((user: { username: any; password: any; }) => user.username == this.myForm.value.username && user.password == this.myForm.value.password)){
      this.router.navigate(['home']);
    }
  }
}
