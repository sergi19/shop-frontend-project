import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, concatMap, mergeMap, switchMap, tap, map, pluck } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host: SafeResourceUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  // addProduct(product: any): Observable<any> {
  //   let formData = new FormData();
  //   formData.append('file', product.img);
  //   return forkJoin({
  //     productPost: this.http.post(this.url, product),
  //     productImgPut: this.http.put(`${this.urlUpload}/${productPost.product._id}`, formData)
  //   }).pipe(
  //     tap(res => console.log(res))
  //   );
  // }

  getAllProducts(): Observable<any> {
    let productsWithImage = [];
    return this.http.get(`${this.host}/products`);

    // mergeMap((product: any) => this.http.get(`${this.host}/productImage/${product.img}`).pipe(
    //   map(productImage => {
    //     const urlToBlob = window.URL.createObjectURL(productImage);
    //     const srcImage = this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
    //     console.log('srcImage', srcImage);
    //     let object = JSON.stringify({
    //       srcImage
    //     })
    //     localStorage.setItem('hola', object);
    //   })
    // ))

    // return this.http.get(`${this.host}/products`)
    // .pipe(
    //   mergeMap((resp: any) => {
    //     if (resp.ok) {
    //       return forkJoin(resp.products.map((product) => {
    //         return this.http.get(`${this.host}/productImage/${product.img}`).pipe(
    //           map((productImg) => {
    //             return {
    //               ...product,
    //               img: productImg
    //             }
    //           }),
    //           tap(r => console.log('rrrrrrrrrrrrr', r))
    //         )
    //       }))
    //     }
    //   })
    // );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.host}/product`, product).pipe(
      switchMap((resp: any) => {
        if (resp.ok) {
          return this.uploadImgProduct(resp, product.img);
        }
      })
    );
  }

  getProductImage(image: any): Observable<any> {
    return this.http.get(`${this.host}/productImage/${image}`, { responseType: 'blob' }).pipe(
      map(img => {
        const urlToBlob = window.URL.createObjectURL(img);
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
      })
    )
  }

  uploadImgProduct(resp, img): Observable<any> {
    let formData = new FormData();
    formData.append('file', img);
    return this.http.put(`${this.host}/upload/${resp.product._id}`, formData).pipe(
      catchError(err => {
        return this.http.delete(`${this.host}/${resp.product._id}`)
      })
    );
  }

}
