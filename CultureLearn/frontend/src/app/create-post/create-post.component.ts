import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  myForm!: FormGroup; // Declare a FormGroup

  constructor(private fb: FormBuilder, private router: Router, private postservice: PostService) {} // Inject FormBuilder

  ngOnInit(): void {
    this.myForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', [Validators.required]],
      posttext: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.myForm.value); // Log form values on submission

    this.postservice.addPost(this.myForm.value).subscribe({
      next: (response) => console.log('Post saved:', response),
      error: (err) => console.error('Error saving Post:', err)
    });

    this.router.navigate(['home']);
  }
}
