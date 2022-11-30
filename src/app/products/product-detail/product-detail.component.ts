import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  //@Input() product: Product;
  product$: Observable<Product>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {

  }

  delete(id: number) {
    if(window.confirm('Are you sure ??')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        }
      )
    }
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.product$ =  this
                      .productService
                      .getProductById(id)
                      // .subscribe(
                      //   data => this.product = data
                      // )
  }

}
