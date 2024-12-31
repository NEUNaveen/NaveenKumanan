import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  myForm!: FormGroup; // Declare a FormGroup

  constructor(private fb: FormBuilder, private router: Router) {} // Inject FormBuilder

  ngOnInit(): void {
    this.myForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.myForm.value); // Log form values on submission
    this.router.navigate(['home']);
  }
}