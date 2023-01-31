import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  productCategory : Category[] = [
    { value:"Phones", viewValue:"Phones"},
    { value:"Laptops", viewValue:"Laptops"},
    { value:"Desktops", viewValue:"Desktops"}
  ];

  freshnessList= ["New", "Refurbished"]
  productForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, 
              private productService: ProductService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editData: any)  {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [],
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });

    if(this.editData) {
      this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['productName'].setValue(this.editData.name);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.actionBtn = "Update";
    }
  }

  addProduct() {
    if(this.productForm.valid) {
      if(this.editData) {
        const p: Product = new Product(this.productForm.value.id,
                                        this.productForm.value.productName,
                                        this.productForm.value.category,
                                        this.productForm.value.freshness,
                                        this.productForm.value.price,
                                        this.productForm.value.comment,
                                        this.productForm.value.date);
        this.productService.updateProduct(p);
        this.productForm.reset();
        this.dialogRef.close('update');
      } else {
        const p: Product = new Product(0,this.productForm.value.productName,
                                        this.productForm.value.category,
                                        this.productForm.value.freshness,
                                        this.productForm.value.price,
                                        this.productForm.value.comment,
                                        this.productForm.value.date);
        this.productService.addProduct(p);
        this.productForm.reset();
        this.dialogRef.close('save');
      }
      
      alert("product saved successfully");
    } else {
      console.log("form invalid");
    }
  }

  getAllProducts() {
    this.productService.getProducts();
  }

}
