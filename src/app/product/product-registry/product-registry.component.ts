import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-registry',
  templateUrl: './product-registry.component.html',
  styleUrls: ['./product-registry.component.scss']
})
export class ProductRegistryComponent implements OnInit {

  productForm: FormGroup;
  imageSrc: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  addProduct() {
    console.log(this.productForm);
    this.productService.addProduct(this.productForm.value)
      .subscribe(resp => {
        //console.log(resp);
      });
  }

  uploadFile($event, fromDirective: boolean) {
    let allowedExtensions = ['png', 'jpg', 'jpeg'];
    const file = fromDirective ? $event[0] : $event.target.files[0];
    if (file.type.split('/')[0] !== 'image' || allowedExtensions.indexOf(file.type.split('/')[1]) < 0) {
      console.log('Extension no permitida');
      return;
    }

    this.productForm.get('img').setValue(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
  }

}
