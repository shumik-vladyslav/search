import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import xlsxParser from 'xlsx-parse-json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data;
  dataStructure = {};
  showDescriptionFlag;
  selected;
  constructor(private http: HttpClient){
    this.http.get('/assets/list.xlsx', { responseType: 'blob' })
    .subscribe(res => {
      xlsxParser
      .onFileSelection(res)
      .then(data => {
        this.data = data.Sheet1;
        console.log(this.data);
        this.data.forEach((element, index) => {
          if(!this.dataStructure[element.Letter]) {
            this.dataStructure[element.Letter] = []
          }
          element["index"] = index;
          this.dataStructure[element.Letter].push(element);
        });
      });
    });
  }

  showDescription(key){
    this.selected = key;
    this.showDescriptionFlag = true;
  }
  hideDescription(){
    this.showDescriptionFlag = false;
  }
}
