import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public location:string;
  public weatherData:any;
  public forecastData:any;
  public f1iconSrc:string;
  public f2iconSrc:string;
  public f3iconSrc:string;
  public f4iconSrc:string;
  public f5iconSrc:string;

  public iconSrc:string;
  public errMessage:any;
  public str:any;
  public f1Str:any;
  public f3Str:any;
  public f2Str:any;
  public f4Str:any;


  public latitude:any;
  public longitude: any;
  public place:string;
  selectedPlace: any;
  public edited=false;
  public value=false;

  public show(){
    this.edited=true;
  }

  constructor(private weather:WeatherService,
    private router:Router) { 

  }

  ngOnInit(): void {
    if(!navigator.geolocation){
      console.log('not supported')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitude=position.coords.latitude
      this.longitude=position.coords.longitude
      console.log(this.latitude);
      console.log(this.longitude);
      this.weather.sendLati(this.latitude);
      this.weather.sendLong(this.longitude);
    })
  }

  public getWeather(){
    
    this.weather.getWeather().subscribe(data=>{
    this.weatherData=data
    this.str=data.weather[0].icon
    this.iconSrc=`https://openweathermap.org/img/wn/${this.str}@2x.png`;
    this.value=true;
    },
      err=>this.errMessage = err);
  }

  public getWeatherByLocation(){
    this.weather.getWeatherByLocation(this.location).subscribe(data=>{
      this.weatherData=data
      this.str=data.weather[0].icon;
    this.iconSrc = `http://openweathermap.org/img/wn/${this.str}@2x.png`;
    this.value=true;
  },
  err=>this.errMessage=err);

}
public getWeatherBySelection(){
  this.weather.getWeatherBySelection(this.selectedPlace).subscribe(data=>{
    this.weatherData=data
    this.str=data.weather[0].icon;
  this.iconSrc = `http://openweathermap.org/img/wn/${this.str}.png`;
  this.value=true;
},
err=>this.errMessage=err);

}

public save(){

  let newData=(<HTMLInputElement>document.getElementById('input')).value;
  if(localStorage.getItem('data')==null){
  localStorage.setItem('data','[]');
  }

  let oldData=JSON.parse(localStorage.getItem('data'));
  oldData.push(newData);

  localStorage.setItem('data',JSON.stringify(oldData));

  
}
public view(){
  if(localStorage.getItem('data')!=null){
    this.place=JSON.parse(localStorage.getItem('data'));
    console.log(this.place)
  }
}
public delete(){
  if(localStorage.getItem('data')!=null){
    let delData=JSON.parse(localStorage.getItem('data'));
    let index = delData.indexOf(this.selectedPlace);
    console.log(index);
    delData.splice(index,1);
    localStorage.setItem('data',JSON.stringify(delData));
    console.log(this.selectedPlace)
  }
}
public getForecast(){
    
  this.weather.getForecast().subscribe(data=>{
  this.forecastData=data
  this.f1Str=data.list[8].weather[0].icon;
  this.f2Str=data.list[16].weather[0].icon;

  this.f3Str=data.list[24].weather[0].icon;
  this.f4Str=data.list[32].weather[0].icon;

this.f1iconSrc = `http://openweathermap.org/img/wn/${this.f1Str}@2x.png`;
this.f2iconSrc = `http://openweathermap.org/img/wn/${this.f2Str}@2x.png`;
this.f3iconSrc = `http://openweathermap.org/img/wn/${this.f3Str}@2x.png`;
this.f4iconSrc = `http://openweathermap.org/img/wn/${this.f2Str}@2x.png`;
  

  },
    err=>this.errMessage = err);
}

public getForecastByLocation(){
  this.weather.getForecastByLocation(this.location).subscribe(data=>{
    this.forecastData=data
    this.f1Str=data.list[8].weather[0].icon;
    this.f2Str=data.list[16].weather[0].icon;
    this.f3Str=data.list[24].weather[0].icon;
    this.f4Str=data.list[32].weather[0].icon;
      
  this.f1iconSrc = `http://openweathermap.org/img/wn/${this.f1Str}@2x.png`;
  this.f2iconSrc = `http://openweathermap.org/img/wn/${this.f2Str}@2x.png`;
  this.f3iconSrc = `http://openweathermap.org/img/wn/${this.f3Str}@2x.png`;
  this.f4iconSrc = `http://openweathermap.org/img/wn/${this.f2Str}@2x.png`;
  
},
err=>this.errMessage=err);

}
public getForecastBySelection(){
this.weather.getForecastBySelection(this.selectedPlace).subscribe(data=>{
  this.forecastData=data
  this.f1Str=data.list[8].weather[0].icon;
  this.f2Str=data.list[16].weather[0].icon;

  this.f3Str=data.list[24].weather[0].icon;
  this.f4Str=data.list[32].weather[0].icon;

this.f1iconSrc = `http://openweathermap.org/img/wn/${this.f1Str}@2x.png`;
this.f2iconSrc = `http://openweathermap.org/img/wn/${this.f2Str}@2x.png`;
this.f3iconSrc = `http://openweathermap.org/img/wn/${this.f3Str}@2x.png`;
this.f4iconSrc = `http://openweathermap.org/img/wn/${this.f2Str}@2x.png`;
  

},
err=>this.errMessage=err);

}
}