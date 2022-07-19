import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn : string = "Save";
  id: string | null;

  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
      @Inject(MAT_DIALOG_DATA) public editData : any,
       private dialogRef : MatDialogRef<DialogComponent>,
       private aRouter: ActivatedRoute) {
        this.id = this.aRouter.snapshot.paramMap.get('id');
        }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productname : ['',Validators.required],
      category : ['',Validators.required],
      date : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required]

    });

    if(this.editData){

      this.actionBtn = "Update";
      this.productForm.controls['productname'].setValue(this.editData.productname);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.posProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error while adding the product")
          }
        })
      }
    }else{
      this.updateProduct();
    }

  }   
  
  updateProduct(){
    this.api.putProducto(this.productForm.value, this.editData._id).subscribe({
      next: (res) => {
        alert("Product Updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error while updating the record")
      }
    })
  }

}
