import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';

@Component({
  selector: 'app-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.css']
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),  // Hidden, used for edit functionality
    projectName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
  });

  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  projectList = signal<ClientProject[]>([]);

  ngOnInit(): void {
    this.getAllClientProject();
    this.getAllEmployee();
  }

  getAllClientProject() {
    this.clientSrv.getAllClientProject().subscribe((res: APIResponseModel) => {
      this.projectList.set(res.data);
    });
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
    });
  }

  // Save or Update Project
  onSaveProject() {
    const formValue = this.projectForm.value;
    if (formValue.clientProjectId) {
      // Editing existing project
      this.clientSrv.updateClientProject(formValue).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Project Updated Successfully');
          this.getAllClientProject();  // Refresh project list
          this.projectForm.reset();
        } else {
          alert(res.message);
        }
      });
    } else {
      // Adding new project
      this.clientSrv.addClientProject(formValue).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Project Created Successfully');
          this.getAllClientProject();  // Refresh project list
          this.projectForm.reset();
        } else {
          alert(res.message);
        }
      });
    }
  }

  // Edit an existing project (populate form with project data)
  onEditProject(data: ClientProject) {
    this.projectForm.patchValue({
      clientProjectId: data.clientProjectId,
      projectName: data.projectName,
      startDate: data.startDate,
      expectedEndDate: data.expectedEndDate,
      leadByEmpId: data.leadByEmpId
    });
  }

  // Delete a project
  onDeleteProject(id: number) {
    if (confirm("Are you sure you want to delete this Project?")) {
      this.clientSrv.deleteClientProject(id).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("Project Deleted Successfully");
          this.getAllClientProject();  // Refresh project list
        } else {
          alert(res.message);
        }
      });
    }
  }
}
