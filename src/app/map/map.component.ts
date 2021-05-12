/// <reference types="@types/googlemaps"/>
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  reports;
  @ViewChild('gmap') gmapElement;
  map: google.maps.Map;

  constructor(private http: HttpClient, private rs: ReportsService) {}

  ngAfterViewInit(): void {
    var mapProps = {
      center: new google.maps.LatLng(49.2, -123),
      zoom: 10,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProps);
    this.rs.get().subscribe((data) => {
      this.reports = data;
      for (let i = 0; i < this.reports.length; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: parseFloat(this.reports[i].data.latitude),
            lng: parseFloat(this.reports[i].data.longitude),
          },
          map: this.map,
          title: `${this.reports[i].data.location}`,
        });
        marker.addListener('click', () => {
          let totalCases = 0;
          for (let j = 0; j < this.reports.length; j++) {
            if (
              this.reports[j].data.latitude == this.reports[i].data.latitude &&
              this.reports[j].data.longitude == this.reports[i].data.longitude
            ) {
              totalCases++;
            }
          }
          let infoWindow = new google.maps.InfoWindow({
            content: `${marker.getTitle()} cases: ${totalCases}`,
          });
          infoWindow.open(this.map, marker);
        });
      }
    });
  }
}
