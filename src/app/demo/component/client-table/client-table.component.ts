import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MenuItem, MessageService } from 'primeng/api';
import { Iclient } from 'src/app/demo/api/iclient';
import { ClientService } from 'src/app/demo/service/client.service';
import { ClientContactsComponent } from '../client-contacts/client-contacts.component';
import { CustomtoastComponent } from '../customtoast/customtoast.component';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
  providers: [MessageService]
})
export class ClientTableComponent implements OnInit{

  showContactTable = false;
  menuItems: MenuItem[] =[];
  clientList!: Iclient[];
  clientDialog: boolean = false;
  deleteClientDialog: boolean = false;
  clientForm! : FormGroup;
  selectedClient!: Iclient;
  cols!: Column[];
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;
  @ViewChild(ClientContactsComponent) child!: ClientContactsComponent


  constructor(private clientService: ClientService, private fb : FormBuilder, private messageService: MessageService) { }

 

  ngOnInit() {
      console.log("Client component");
      this.clientService.GetAllClients().subscribe(data => {
        this.clientList = data;
        localStorage.setItem('clientList', JSON.stringify(this.clientList));
      });
     
      this.clientForm = this.fb.group({
        clientId : ['',[Validators.required]],
        name : ['', [Validators.required]],
        email : ['', [Validators.required]],
        website : ['', [Validators.required]]
      })

      this.cols = [
        { field: 'clientId', header: 'CLientId' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'website', header: 'Website' },
    ];

  
  }

  openClientContactsDialog() {
    console.log("CLientid :", this.selectedClient);
    if (this.child) {
      this.child.clientContactDialog = true;
    }

  }

  selectClient(client: Iclient) {
    if (client) {
      const clientId = client.clientId; 
       this.clientService.setClientId(clientId); 
      this.selectedClient = client;
      this.showContactTable = true;
    }
  }

  fetchTableData(id : number)
  {
    this.clientService.GetClientById(id).subscribe(data =>{
      console.log(data);
      this.clientForm.controls['clientId'].setValue(data.clientId);
      this.clientForm.controls['name'].setValue(data.name);
      this.clientForm.controls['email'].setValue(data.email);
      this.clientForm.controls['website'].setValue(data.website);
    });
  }

  hideDialog() {
    this.clientDialog = false;
  }

  openNew() {
    this.clientDialog = true;
  }
 
  editClient(selectedClient : Iclient)
  {
    if(this.selectedClient)
    {
      this.clientDialog = true;
      this.selectedClient = selectedClient;
      this.fetchTableData(selectedClient.clientId);
    }
    else
    {
      this.customToast.showSelectDataToast();
    }
  }

  deleteClient(selectedClient : Iclient) {
    if(this.selectedClient)
    {
      this.deleteClientDialog = true;
      console.log(selectedClient.clientId);
    }
    else {
      this.customToast.showSelecteDataDeletedToast();
    }
  }

  saveClient() {
    console.log(this.clientForm);
    if(this.selectedClient)
    {
      // debugger
      this.clientService.UpdateClient(this.clientForm.value).subscribe()
      this.customToast.showSuccessToast("Updated Successfuly");
    }
    else
    {
      this.clientService.InsertClient(this.clientForm.value).subscribe();
      this.customToast.showSuccessToast("Inserted Successfuly");
    }
    this.clientForm.reset();
    this.clientDialog = false;

  }

  confirmDelete(client : Iclient) {
    this.clientService.DeleteCLient(client.clientId).subscribe();
    this.clientList = this.clientList.filter(item => item.clientId !== client.clientId);
    this.messageService.add({ severity: 'success', summary: 'Successfuly Deleted'});
    this.deleteClientDialog = false;
}
exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.clientList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'clientList');
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

}
