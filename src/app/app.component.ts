import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import { ProductService } from './product.service';
import { Product } from './product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'name', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource : MatTableDataSource<Product> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'product-client';
  
  constructor(private dialog: MatDialog,
              private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  // ngAfterViewInit(): void {
    
  // }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe((val:string)=> {
      if(val==='save') {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.dataSource.data = res;
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe((val:string)=> {
      if(val==='update') {
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((val:any) => {
      this.getAllProducts();
    });
  }
}
