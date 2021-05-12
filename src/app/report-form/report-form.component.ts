import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportsService } from '../reports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent implements OnInit {
  myForm;
  reports;
  existingLocations;
  constructor(private rs: ReportsService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      location: new FormControl(''),
      personReported: new FormControl(''),
      dateOfVisit: new FormControl(''),
      phoneNumber: new FormControl(''),
      extraNotes: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
      time: new FormControl(''),
    });
    this.rs.get().subscribe((data) => {
      this.reports = data;
      this.existingLocations = this.reports.map((r) => r.data.location);
      this.existingLocations = this.existingLocations.filter(
        (l, i) => this.existingLocations.indexOf(l) === i
      );
    });
  }

  sendReport(report) {
    if (
      !report.personReported ||
      report.dateOfVisit == '' ||
      report.location == '' ||
      report.time == ''
    ) {
      alert('Please enter all fields');
      return;
    }

    for (let i = 0; i < this.reports.length; i++) {
      if (this.reports[i].data.personReported == report.personReported) {
        alert('This person is already reported');
        return;
      }
    }

    if (
      isNaN(parseFloat(report.latitude)) ||
      isNaN(parseFloat(report.longitude)) ||
      isNaN(parseFloat(report.phoneNumber))
    ) {
      alert(
        'Please ensure longitude, latitude, and phone number are numerical values'
      );
      return;
    }

    this.rs.add(report).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }
}
