/**
 * Implementation of the Mock-Backend
 */

import {
    Http, BaseRequestOptions, Response, ResponseOptions,
    RequestMethod, XHRBackend, RequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { employees } from './employees';
import { Employee } from './employee';

function fakeBackendFactory(backend: MockBackend,
    options: BaseRequestOptions,
    realBackend: XHRBackend) {
    // first, get employess from the local storage or initial data array
    const data: Employee[] = JSON.parse(localStorage.getItem('employees')) || employees;

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
            if (connection.request.url.endsWith('/employees') &&
                connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: data
                })));

                return;
            }
            // TODO: Request-URL mapping to mock data
        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
