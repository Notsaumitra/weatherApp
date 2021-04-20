import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http'
import { throwError, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public latitude:any;
  public longitude:any;




  sendLati(data){
    this.latitude=data;
    console.log(this.latitude);
  }
  sendLong(data){
    this.longitude=data;
    console.log(this.longitude);
  }

  constructor(private http:HttpClient) {
    
   }

  public getWeather():Observable<any>{
  let url=`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=324bac5c7749af55301fd724bb6147ff`;
    return this.http.get<any>(url).
    pipe(catchError(this.errorHandler));
  }

  public getForecast():Observable<any>{
    let url=`https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=324bac5c7749af55301fd724bb6147ff`;
      return this.http.get<any>(url).
      pipe(catchError(this.errorHandler));
    }

  public getWeatherByLocation(location):Observable<any>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=324bac5c7749af55301fd724bb6147ff`;
    return this.http.get<any>(url).
    pipe(catchError(this.errorHandler));
  
  }
  public getForecastByLocation(location):Observable<any>{
    let url=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=324bac5c7749af55301fd724bb6147ff`;
    return this.http.get<any>(url).
    pipe(catchError(this.errorHandler));
  
  }

  public getWeatherBySelection(place):Observable<any>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=324bac5c7749af55301fd724bb6147ff`;
    return this.http.get<any>(url).
    pipe(catchError(this.errorHandler));
  }

  public getForecastBySelection(place):Observable<any>{
    let url=`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=324bac5c7749af55301fd724bb6147ff`;
    return this.http.get<any>(url).
    pipe(catchError(this.errorHandler));
  }

  errorHandler(err: HttpErrorResponse){
    return throwError(err.message);
  } 
}
