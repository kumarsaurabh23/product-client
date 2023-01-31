import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product: any;
  private products: Product[]=[];

  constructor(private http:HttpClient) { }

  public addProduct(productParam: Product): Product {
    this.http.post("http://localhost:8080/addProduct", productParam).subscribe((data: any)=> {
      console.log(data);
      this.product=data;
    });
    return this.product;
  }

  public getProducts(): any {
    return this.http.get("http://localhost:8080/getProducts");
  }

  public updateProduct(productParam: Product): Product {
    this.http.post("http://localhost:8080/updateProduct", productParam).subscribe((data: any)=> {
      console.log(data);
      this.product=data;
    });
    return this.product;
  }

  public deleteProduct(id: number): any {
    console.log("deleting " + id);
    return this.http.delete("http://localhost:8080/deleteProduct/"+id);
  }
}
