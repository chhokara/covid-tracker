import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  key;
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Object>(
      'https://218.selfip.net/apps/yUQ4yMKkah/collections/data1/documents/'
    );
  }
  add(newReport) {
    return this.http.post(
      'https://218.selfip.net/apps/yUQ4yMKkah/collections/data1/documents/',
      { key: newReport.personReported, data: newReport }
    );
  }
  delete(deleteReport) {
    return this.http.delete(
      `https://218.selfip.net/apps/yUQ4yMKkah/collections/data1/documents/${deleteReport.personReported}`
    );
  }
  getReport(person) {
    return this.http.get<Object>(
      `https://218.selfip.net/apps/yUQ4yMKkah/collections/data1/documents/${person}`
    );
  }
  setKey(k) {
    this.key = k;
  }
  getKey() {
    return this.key;
  }
}
