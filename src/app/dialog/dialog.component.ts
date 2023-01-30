import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  productCategory : Category[] = [
    { value:"Phones", viewValue:"Phones"},
    { value:"Laptops", viewValue:"Laptops"},
    { value:"Desktops", viewValue:"Desktops"}
  ];

  freshnessList= ["New", "Refurbished"]
  productForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private productService: ProductService,
              private dialogRef: MatDialogRef<DialogComponent>) {}

  addProduct() {
    if(this.productForm.valid) {
      let p: Product = new Product(0,this.productForm.value.productName,
                                this.productForm.value.category,
                                this.productForm.value.freshness,
                                this.productForm.value.price,
                                this.productForm.value.comment,
                                this.productForm.value.date);
      this.productService.addProduct(p);
      this.productForm.reset();
      this.dialogRef.close();
      alert("product saved successfully");
    } else {
      console.log("form invalid");
    }
  }

  getAllProducts() {
    this.productService.getProducts();
  }

}
