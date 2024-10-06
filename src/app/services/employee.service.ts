import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://freeapi.miniprojectideas.com/api/ClientStrive';

  constructor(private http: HttpClient) {}

  
  addNewEmployee(employee: any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${this.baseUrl}/CreateNewEmployee`,
      employee
    );
  }

  
  getAllEmployees(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.baseUrl}/GetAllEmployee`);
  }

  
  getEmployeeById(empId: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.baseUrl}/GetEmployeeByEmployeeId?empId=${empId}`);
  }

 
  updateEmployee(employee: any): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(
      `${this.baseUrl}/UpdateEmployee`,
      employee
    );
  }

  
  deleteEmployee(empId: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.baseUrl}/DeleteEmployeeByEmpId?empId=${empId}`);
  }

  
  addEmployeeToProject(projectEmpId: number, employeeId: number, projectId: number, addedDate: string): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${this.baseUrl}/AddEmployeeToProject`,
      { projectEmpId, employeeId, projectId, addedDate }
    );
  }

 
  deleteEmployeeFromProject(projectEmpId: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.baseUrl}/DeleteEmployeeFromProject?projectEmpId=${projectEmpId}`);
  }

  
  getEmployeesByProjectId(projectId: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.baseUrl}/GetEmployeesByProjectId?projectId=${projectId}`);
  }

  
  getAllProjectsEmployees(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.baseUrl}/GetAllProjectsEmployees`);
  }
}
