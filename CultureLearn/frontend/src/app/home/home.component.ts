import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any;

  // constructor(private ps: ProductService){
  //   ps.addProduct({name: "prod1", price: 10, description: "the first product"}).subscribe(
  //     response => {
  //       console.log('Product added successfully:', response);

  //     },
  //     error => {
  //       console.error('Error adding product:', error);
  //       // Handle error
  //     }
  //   );
  //   ps.getProducts().subscribe((data) => {
  //     this.products = data;
  //     console.log('Trackers:', this.products);
  //   });
  // }
  
}
