import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import xlsxParser from 'xlsx-parse-json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data;
  dataStructure = {};
  showLettersFlag:boolean;
  selected;
  showLetter;
  showWrapper;

  constructor(private http: HttpClient, private route:ActivatedRoute,
    private router: Router){

    this.getData();
  }

  selectElement(key, element) {
    // this.selected = element;
    // this.showWrapper = 'description';
    this.router.navigate(['search', key, element.index]);
  }

  selectLetter(element) {
    // this.selected = element;
    // this.showWrapper = 'list';
    this.router.navigate(['search', element]);
  }

  showLetters(key){
    this.showLetter = key;
    this.showLettersFlag = true;
  }

  hideLetters(){
    this.showLettersFlag = false;
  }

  ngOnInit(): void {
  }

  getData() {
    this.http.get('/assets/list.xlsx', { responseType: 'blob' })
    .subscribe(res => {
      xlsxParser
      .onFileSelection(res)
      .then(data => {
        this.data = data['Лист1'];
        console.log(this.data);
        this.data.forEach((element, index) => {
          if(element.Name && element.Name.length === 1){
            this.dataStructure[element.Name] = [];
          } else {
            let letter = element.Name.charAt(0).toUpperCase();
            if(!this.dataStructure[letter]) {
              this.dataStructure[letter] = [];
            }
            element["index"] = this.dataStructure[letter].length;
            this.dataStructure[letter].push(element);
          }
        });
        console.log(this.dataStructure);


        // this.data = data.Sheet1;
        // console.log(this.data);
        // this.data.forEach((element, index) => {
        //   if(!this.dataStructure[element.Letter]) {
        //     this.dataStructure[element.Letter] = []
        //   }
        //   element["index"] = this.dataStructure[element.Letter].length;
        //   this.dataStructure[element.Letter].push(element);
        // });

        this.route.paramMap.subscribe( param => {
          console.log(param.get('latter'));
          if(param.get('latter') && !param.get('word')) {
            this.showWrapper ='list';
            this.selected = param.get('latter');
          }
          if(param.get('latter') && param.get('word')) {
            
            this.selected = this.dataStructure[param.get('latter')][param.get('word')];
            console.log(this.dataStructure, this.data,this.selected, this.dataStructure[param.get('latter')],
            param.get('word'));
            this.showWrapper ='description';
            // this.selected = param.get('word');
          }
        })
      });
    });
  }

}
