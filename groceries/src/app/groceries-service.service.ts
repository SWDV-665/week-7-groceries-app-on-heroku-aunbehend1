import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceProvider {
  
  items: any = [];
  dataChanged$: Observable<boolean>;
  
  private dataChangeSubject: Subject<boolean>;
  
  baseURL = 'https://finalweek7andyu.herokuapp.com/api/groceries';
  // Add to the services
  constructor(public http: HttpClient) {
  console.log('Hello GroceriesServicesProvider Provider');
  
  this.dataChangeSubject = new Subject<boolean>();
  this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
    

// Read(Read)Method
getItems() {
  return this.http
    .get(this.baseURL + '/api/groceries')
    .pipe(map(this.extractData), catchError(this.handleError));
}

private extractData(res: Response) {
  let body = res;
  return body || {};
}

  private handleError(error: Response | any ) {
    let errMsg: string;
    if (error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString(); 
    } 
    console.error(errMsg)
    return throwError(errMsg);
  }

  removeItem(id) {
    console.log("Item Found - id", id); 
    this.http.delete(this.baseURL + "/api/groceries" + id).subscribe(res => {
        this.items = res;
        this.dataChangeSubject.next(true); 
      }); 
    }


  addItem(item) {
    this.http.post(this.baseURL + "/api/groceries", item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item, index) {
    this.http.post(this.baseURL + "/api/groceries" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

}