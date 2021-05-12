import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-covid-table',
  templateUrl: './covid-table.component.html',
  styleUrls: ['./covid-table.component.css'],
})
export class CovidTableComponent implements OnInit {
  reports;

  constructor(private router: Router, private rs: ReportsService) {}

  ngOnInit(): void {
    this.rs.get().subscribe((data) => (this.reports = data));
  }

  addForm(e) {
    this.router.navigateByUrl('/reportForm');
  }

  deleteReport(report) {
    this.rs.delete(report).subscribe((data) => {
      this.reports = this.reports.filter((r) => r.data !== report);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/']);
      });
    });
  }

  moreInfo(person) {
    this.rs.setKey(person);
    this.router.navigateByUrl('/moreInfo');
  }

  //source: http://www.javascriptkit.com/javatutors/arraysort2.shtml#:~:text=The%20sort()%20method%20can,compares%20the%20desired%20properties'%20values.
  sortReports(sortBy) {
    console.log(sortBy);
    switch (sortBy) {
      case 'Location':
        this.reports.sort(function (a, b) {
          var locationA = a.data.location.toLowerCase(),
            locationB = b.data.location.toLowerCase();
          if (locationA < locationB)
            //sort string ascending
            return -1;
          if (locationA > locationB) return 1;
          return 0; //default return value (no sorting)
        });
        break;
      case 'Person Reported':
        this.reports.sort(function (a, b) {
          var personReportedA = a.data.personReported.toLowerCase(),
            personReportedB = b.data.personReported.toLowerCase();
          if (personReportedA < personReportedB)
            //sort string ascending
            return -1;
          if (personReportedA > personReportedB) return 1;
          return 0; //default return value (no sorting)
        });
        break;
      case 'Date Of Visit':
        this.reports.sort(function (a, b) {
          var dateTimeA =
              a.data.dateOfVisit.toLowerCase() + a.data.time.toLowerCase(),
            dateTimeB =
              b.data.dateOfVisit.toLowerCase() + b.data.time.toLowerCase();

          if (dateTimeA < dateTimeB)
            //sort string ascending
            return -1;
          if (dateTimeA > dateTimeB) return 1;
          return 0; //default return value (no sorting)
        });
        break;
    }
  }
}
