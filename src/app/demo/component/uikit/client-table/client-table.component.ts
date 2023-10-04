import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Iclient } from 'src/app/demo/api/iclient';
import { ClientService } from 'src/app/demo/service/client.service';''
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
export class ClientTableComponent implements OnInit {
  showContactTable = false;
  menuItems: MenuItem[] =[];
  clientList!: Iclient[];
  clientDialog: boolean = false;
  deleteClientDialog: boolean = false;
  clientForm! : FormGroup;
  selectedClient!: Iclient;
  cols!: Column[];
  constructor(private clientService: ClientService, private fb : FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

      this.clientService.GetAllClients().subscribe(data => {
        this.clientList = data;
        console.log(this.clientList);

        this.menuItems = this.clientList.map((client) => ({
          label: client.name,
          command: () => this.selectClient(client),
        }));
        
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
  handleClientSelection(selectedClient: Iclient) {
    // Handle the selected client here
    console.log('Selected client:', selectedClient);
  }
  selectClient(client: Iclient) {
    this.selectedClient = client;
    this.showContactTable = true;
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
 
  editDesgination(selectedClient : Iclient)
  {
    if(this.selectedClient)
    {
      this.clientDialog = true;
      this.selectedClient = selectedClient;
      this.fetchTableData(selectedClient.clientId);
    }
    else
    {
      this.messageService.add({ severity: 'info', summary: 'Please select data you want to change' });
    }
  }

  deleteProduct(selectedClient : Iclient) {
    if(this.selectedClient)
    {
      this.deleteClientDialog = true;
      console.log(selectedClient.clientId);
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Please select data you want to delete',life: 1000});
    }
  }

  saveClient() {
    console.log(this.clientForm);
    if(this.selectedClient)
    {
      // debugger
      this.clientService.UpdateClient(this.clientForm.value).subscribe()
      this.messageService.add({ severity: 'success', summary: 'Successfuly Updated'});
    }
    else
    {
      this.clientService.InsertClient(this.clientForm.value).subscribe();
      this.messageService.add({ severity: 'success', summary: 'Successfuly Inserted'});
      this.clientForm.reset();
    }
    this.clientDialog = false;

    // const isUpdate = this.selectedDesignation && this.selectedDesignation.designationId;
    // const formData = { ...this.designationForm.value };
    // if (isUpdate) {
    //   formData.designationId = this.selectedDesignation.designationId;
    // }
    // const apiCall = isUpdate ? this.designationService.UpdateDesignation(formData): this.designationService.InsertDesignation(formData);

    // apiCall.subscribe(() => {
    //   console.log(isUpdate ? "Update successful" : "Insert successful");
    //   this.designationDialog = false;
    // });
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
