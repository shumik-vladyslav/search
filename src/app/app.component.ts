import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import xlsxParser from 'xlsx-parse-json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search';
  constructor(private http: HttpClient){
    this.http.get('/assets/list.xlsx', { responseType: 'blob' })
    .subscribe(res => {
      xlsxParser
      .onFileSelection(res)
      .then(data => {
        var parsedData = data;
        console.log(data);
        
      });
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   var base64data = reader.result;                
      //       console.log(base64data);
      // }

      // reader.readAsDataURL(res); 
      // console.log(res);
    });
  
  //   this.http.get('assets/list.xlsx', {responseType: 'text'})
  // .subscribe((data:any) => {
  //   console.log(data);
     
  // },
  // (err) => {
  //   if (err.error instanceof Error) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.log('An error occurred:', err.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
  //    }
  //   }
  // );
  }
}
