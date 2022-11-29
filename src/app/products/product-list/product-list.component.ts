
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]> = this.productService.products$;
  selectedProduct: Product;

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  constructor(
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     data => this.products = data
    //   );
  }

  ngOnDestroy(): void {

  }

}
