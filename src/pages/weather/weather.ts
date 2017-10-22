import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService} from '../../app/services/weather.service'; 

@Component({
  selector: 'weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {

  zmw: any;  
  weather : any; 
  searchStr : String;
  results : any; 

  constructor(public navCtrl: NavController, private weatherService: WeatherService) {
  }

  ngOnInit()
  {
  	this.getDefaultLocation(); 
  	this.weatherService.getWeather(this.zmw)
  		.subscribe(weather =>
  			{
  				this.weather = weather.current_observation; 
  			}); 
  } 

  getDefaultLocation()
  {
  	this.zmw = '10001.11.99999';
  }


  getQuery()
  {
  	console.log(this.searchStr); 
  	this.weatherService.searchCities(this.searchStr)
  		.subscribe(res => {
  			this.results = res.RESULTS; 
  		}); 
  }

  chooseLocation(location)
  {
  	this.results = [];

  	// On va se baser sur le paramètre zmw (sorte de clé primaire qu'on peut passer dans la recherche météo de la ville)  }
 	this.weatherService.getWeather(location.zmw)
  		.subscribe(weather =>
  			{
  				this.weather = weather.current_observation; 
  			});
  	}
  }
