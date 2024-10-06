import { Component, OnInit, inject } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { APIResponseModel } from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../reusableComponent/alert/alert.component';
import { MyButtonComponent } from '../../reusableComponent/my-button/my-button.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'] 
})
export class ClientComponent implements OnInit{

  currentDate:Date = new Date();

  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService); 

  userList$ : Observable<any> = new Observable<any>;

  ngOnInit(): void {
    this.loadClient();
    this.userList$ =  this.clientService.getAllUser();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList = res.data;
    })
  }

  onSaveClient(data: string) {
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result) {
        alert("Client Created Successfully");
        this.loadClient();
        this.clientObj = new Client();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this Client");
    if(isDelete) {
      this.clientService.deleteClientById(id).subscribe((res:APIResponseModel)=>{
        if(res.result) {
          alert("Client Deleted Successfully");
          this.loadClient();
        } else {
          alert(res.message)
        }
      })
    }

  }

}