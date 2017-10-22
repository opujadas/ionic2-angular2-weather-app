import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService} from '../../app/services/weather.service'; 
import {WeatherPage} from '../weather/weather';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

	results : any;
	searchStr : String;
	defaultLocation : any; 

  constructor(public navCtrl: NavController, private weatherService: WeatherService) {

  }

  ngOnInit()
  {
  	this.getDefaultLocation();

  }


  getQuery()
  {
  	console.log(this.searchStr); 
  	this.weatherService.searchCities(this.searchStr)
  		.subscribe(res => {
  			this.results = res.RESULTS; 
  		}); 
  }

	getDefaultLocation()
	{
		if (localStorage.getItem('location') !== undefined)
		{
			this.defaultLocation = JSON.parse(localStorage.getItem('location')).name;
		}
		else
			{
				this.defaultLocation = '10001.11.99999';
			} 
	}  	


	setDefaultLocation(location)
	{
		this.results = []; 
		// En storage local, on ne peut mettre que des strings, d'où une stringifyisation de la locatio
		localStorage.setItem('location', JSON.stringify(location)) ; 
		this.searchStr = location.name; 
		this.getDefaultLocation();
	}

	saveChanges()
	{
		this.navCtrl.push(WeatherPage); 
	}



}
