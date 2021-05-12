import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css'],
})
export class MoreInfoComponent implements OnInit {
  report;
  key;
  constructor(private rs: ReportsService) {}

  ngOnInit(): void {
    this.key = this.rs.getKey();
    console.log(this.key);
    this.rs.getReport(this.key).subscribe((data) => (this.report = data));
  }
}
