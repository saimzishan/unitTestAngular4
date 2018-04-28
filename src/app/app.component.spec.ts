import { employees } from './employees';
import { TestBed, async, getTestBed, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EmployeeService } from './Hero.services';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import {
  BaseRequestOptions,
  Http, HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { ConnectionBackend, RequestOptions } from '@angular/http';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [MockBackend,
        BaseRequestOptions,
        MockBackend,
        EmployeeService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
describe('EmployeeService', () => {
  // let component: AppComponent;
  // let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    // fixture = TestBed.createComponent(AppComponent);
    // component = fixture.componentInstance;
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        EmployeeService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getEmployee()', () => {
    it('should return an Observable<Array<Employee>>',
      inject([EmployeeService, XHRBackend], (videoService, mockBackend) => {

        const mockResponse = {
          data: [
            {
              id: 1,
              firstName: 'Max',
              lastName: 'Mustermann',
              profession: 'Junior Developer',
              department: 'IT'
            },
            {
              id: 2,
              firstName: 'Sara',
              lastName: 'Smidth',
              profession: 'Sofware Engineer',
              department: 'IT'
            },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        videoService.getEmployees().subscribe((employee) => {
          expect(employee.data.length).toBe(2);
          // component.employees = employee.data;
          expect(employee.data[0].firstName).toEqual('Max');
          expect(employee.data[0].lastName).toEqual('Mustermann');
        });

      }));
  });
});


