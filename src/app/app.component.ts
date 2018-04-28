import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from './Hero.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  employees;
  constructor(private userService: EmployeeService) {}
  ngOnInit() {
    this.getEmployees();
  }
  getEmployees() {
    this.userService.getEmployees()
      .subscribe((res: any) => {
        this.employees = res;
      },
        errors => {
          const e = errors.json();
          console.log(e);
        });
  }
}
