
// // get all employees
// if (connection.request.url.endsWith('/fake-backend/employees') &&
//     connection.request.method === RequestMethod.Get) {
//     connection.mockRespond(new Response(new ResponseOptions({
//         status: 200,
//         body: data
//     })));

//     return;
// }

// // create employee
// if (connection.request.url.endsWith('/fake-backend/employees') &&
//     connection.request.method === RequestMethod.Post) {
//     let receivedEmployee = JSON.parse(connection.request.getBody());
//     let newEmployee = Object.assign(receivedEmployee, { id: uuid.generate() });
//     data[data.length] = newEmployee;

//     localStorage.setItem('employees', JSON.stringify(data));

//     connection.mockRespond(new Response(new ResponseOptions({
//         status: 200,
//         body: newEmployee
//     })));

//     return;
// }

// // update employee
// if (connection.request.url.endsWith('/fake-backend/employees') &&
//     connection.request.method === RequestMethod.Put) {
//     let receivedEmployee = JSON.parse(connection.request.getBody());
//     let clonedEmployee = Object.assign({}, receivedEmployee);
//     let employeeWasFound = false;
//     data.some((element: Employee, index: number) => {
//         if (element.id === clonedEmployee.id) {
//             data[index] = clonedEmployee;
//             employeeWasFound = true;
//             return true;
//         }
//     });

//     if (!employeeWasFound) {
//         connection.mockRespond(new Response(new ResponseOptions({
//             status: 400,
//             body: 'Employee could not be updated because was not found'
//         })));
//     } else {
//         localStorage.setItem('employees', JSON.stringify(data));

//         connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
//     }

//     return;
// }

// // delete employee
// if (connection.request.url.match(/\/fake-backend\/employees\/.{36}$/) &&
//     connection.request.method === RequestMethod.Delete) {
//     let urlParts = connection.request.url.split('/');
//     let id = urlParts[urlParts.length - 1];
//     let sizeBeforeDelete = data.length;
//     data = data.filter((element: Employee) => element.id !== id);

//     if (sizeBeforeDelete === data.length) {
//         connection.mockRespond(new Response(new ResponseOptions({
//             status: 400,
//             body: 'Employee could not be deleted because was not found'
//         })));
//     } else {
//         localStorage.setItem('employees', JSON.stringify(data));

//         connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
//     }

//     return;
// }

// // pass through any requests not handled above
// let realHttp = new Http(realBackend, options);
// let requestOptions = new RequestOptions({
//     method: connection.request.method,
//     headers: connection.request.headers,
//     body: connection.request.getBody(),
//     url: connection.request.url,
//     withCredentials: connection.request.withCredentials,
//     responseType: connection.request.responseType
// });
// realHttp.request(connection.request.url, requestOptions)
//     .subscribe((response: Response) => {
//         connection.mockRespond(response);
//     },
//         (error: any) => {
//             connection.mockError(error);
//         });