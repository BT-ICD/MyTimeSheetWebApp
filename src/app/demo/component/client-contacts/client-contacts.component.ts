import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IclientContacts } from 'src/app/demo/api/iclient-contacts';
import { ClientContactsService } from 'src/app/demo/service/client-contacts.service';
import { ClientService } from 'src/app/demo/service/client.service';
import { DesignationService } from 'src/app/demo/service/designation.service';
import { Idesignation } from 'src/app/idesignation';
import { CustomtoastComponent } from '../customtoast/customtoast.component';
import * as FileSaver from 'file-saver';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.css'],
})
export class ClientContactsComponent implements OnInit{
  
  // abc! : number
  // @Input() set client(clientId : number){
  //   this.abc = clientId
  // }

  @Input() clientId!: number;
  clientContactList! : IclientContacts[];
  clientContactDialog: boolean = false;
  clientContactForm! : FormGroup;
  selectedClientContact! : IclientContacts;
  deleteClientContactDialog: boolean = false;
  clientContact!: IclientContacts;
  designationNames: string[] = [];
  designationList !: Idesignation[];
  cols!: Column[];
  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;


  constructor(private clientContactsService : ClientContactsService,  private fb : FormBuilder, private messageService : MessageService, private clientService : ClientService, private designationService : DesignationService) {  }

   ngOnInit()
   {
    this.clientService.getClientId().subscribe(client => {
      if (client !== null) {
        this.clientContactsService.getClientContactsByClientId(client).subscribe(data => {
          this.clientContactList = data;
          console.log(this.clientContactList);
        });
      }
    });
  
    this.clientContactForm = this.fb.group({
      contactId :[''],
      name : ['', [Validators.required]],
      email : ['', [Validators.required]],
      mobile : ['', [Validators.required]],
      clientId : this.clientId,
      designationName: ['', Validators.required],
      designationId : ['']
    })

    
    this.designationService.GetDesignation().subscribe(data =>{
      this.designationList = data;
      this.designationNames = data.map(x=> x.designationName);
      console.log("designation===>",this.designationList);
    });
    
    this.cols = [
      { field: 'contactId', header: 'ContactId' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile', header: 'Contact No' },
  ];
  }
   

  ngOnChanges(): void {
    // if(this.clientId)
    // {
    //   this.clientContactsService.getClientContactsByClientId(this.clientId).subscribe(data => {
    //      this.clientContactList = data;
    //     // console.log(this.clientContactList);
    //     // this.clientContactList = data.filter(item => item.clientId === this.clientId)
    //   });
    // }
    // this.clientContactForm = this.fb.group({
    //   contactId :[''],
    //   name : ['', [Validators.required]],
    //   email : ['', [Validators.required]],
    //   mobile : ['', [Validators.required]],
    //   clientId : this.clientId,
    //   designationName: ['', Validators.required],
    //   designationId : ['']
    // })

    // this.designationService.GetDesignation().subscribe(data => {
    //   this.designationData = data;
    //   this.designationDataLoaded = true;
    //   });
      
  
    //   this.designationService.GetDesignation().subscribe(data => {
    //     this.designationName = data.map(designation => designation.designationName);
    //   })
  }

  hideDialog() {
    this.clientContactDialog = false;
    this.clientContactForm.reset();
  }

  fetchTableData(id : number)
  {
    this.clientContactsService.getClientContactById(id).subscribe(data =>{
      console.log(data);

      this.clientContactForm.controls['contactId'].setValue(data.contactId);
      this.clientContactForm.controls['name'].setValue(data.name);
      this.clientContactForm.controls['email'].setValue(data.email);
      this.clientContactForm.controls['mobile'].setValue(data.mobile);
      this.clientContactForm.controls['designationId'].setValue(data.designationId);

      // this.clientContactForm.setValue({
      //   contactId : data.contactId,
      //   name : data.name,
      //   email : data.email,
      //   mobile : data.mobile,
      //   designationId : data.designationId
      // })
      
    });
  }

  editClientContact(selectedClientContact : IclientContacts)
  {
    if(this.selectedClientContact)
    {
      this.clientContactDialog = true;
      this.selectedClientContact = selectedClientContact;
      this.fetchTableData(selectedClientContact.contactId);
    }
    else
    {
      this.customToast.showSelectDataToast();
    }
  }

  deleteClientContact(selectedClientContact : IclientContacts) {
    if(this.selectedClientContact)
    {
      this.deleteClientContactDialog = true;
      console.log(selectedClientContact.contactId);
    }
    else {
      this.customToast.showSelecteDataDeletedToast();
    }
  }

  saveClient() {
    debugger;
    console.log(this.clientContactForm.value);
   
    const formData = { ...this.clientContactForm.value };
    delete formData.contactId;
    formData.clientId = this.clientId;

    const selectedDesignation = this.designationList.find(d => d.designationName == formData.designationName);
     
    if (selectedDesignation) {
      formData.designationId = selectedDesignation.designationId; 
    }

    console.log(formData);

    console.log(formData)
    if(this.selectedClientContact)
    {
      formData.contactId = this.selectedClientContact.contactId;

      this.clientContactsService.updateClientContact(formData).subscribe(data =>
        {
          this.customToast.showSuccessToast("Updated Succefully");
        })
    }
    else
    {  
      this.clientContactsService.insertClientContact(formData).subscribe(data => {
        console.log(data);
        this.customToast.showSuccessToast("Inserted Succefully");       
      });
    }
     this.clientContactDialog = false;
    this.clientContactForm.reset();
  }

  confirmDelete(clientContact: IclientContacts) {
    this.clientContactsService.DeleteClientContact(clientContact.contactId).subscribe();
    this.clientContactList = this.clientContactList.filter(item => item.contactId !== clientContact.contactId);
    this.messageService.add({ severity: 'success', summary: 'Successfully Deleted' });
    this.deleteClientContactDialog = false;
  }
  
  exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.clientContactList);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'clientContactList');
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
