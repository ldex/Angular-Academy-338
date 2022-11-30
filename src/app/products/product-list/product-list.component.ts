
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
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
  errorMessage: string;
  products$: Observable<Product[]> = this
                                        .productService
                                        .products$
                                        .pipe(
                                          catchError(
                                            error => {
                                              this.errorMessage = error;
                                              return EMPTY;
                                            }
                                          )
                                        );
  selectedProduct: Product;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  pageNumber = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.pageNumber--;
    this.selectedProduct = null;
  }

  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.pageNumber++;
    this.selectedProduct = null;
  }


  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router
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
