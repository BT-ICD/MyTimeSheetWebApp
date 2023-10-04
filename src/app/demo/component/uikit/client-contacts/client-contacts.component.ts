import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IclientContacts } from 'src/app/demo/api/iclient-contacts';
import { ClientContactsService } from 'src/app/demo/service/client-contacts.service';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.css']
})
export class ClientContactsComponent{
  
  @Input() clientId!: number;
  clientContactList! : IclientContacts[];
  clientContactDialog: boolean = false;
  clientContactForm! : FormGroup;
  selectedClientContact! : IclientContacts;
  deleteClientContactDialog: boolean = false;
  clientContact!: IclientContacts;
  formDirty: boolean = false;

  constructor(private clientContactsService : ClientContactsService,  private fb : FormBuilder, private messageService : MessageService) {  }
 
  ngOnChanges(): void {
   
    if(this.clientId)
    {
      this.clientContactsService.getClientContact().subscribe(data => {
        this.clientContactList = data;
        console.log(this.clientContactList);
        this.clientContactList = data.filter(item => item.clientId === this.clientId)
      });
    }

    this.clientContactForm = this.fb.group({
      contactId : ['',[Validators.required]],
      name : ['', [Validators.required]],
      email : ['', [Validators.required]],
      mobile : ['', [Validators.required]],
      clientId : this.clientId,
    })

    this.clientContactForm.valueChanges.subscribe(() => {
    this.formDirty = this.clientContactForm.dirty;
  });
  }

  openNew() {
    this.clientContactDialog = true;
  }
  hideDialog() {
    this.clientContactDialog = false;
  }
  fetchTableData(id : number)
  {
    this.clientContactsService.getClientContactById(id).subscribe(data =>{
      console.log(data);
      this.clientContactForm.controls['contactId'].setValue(data.contactId);
      this.clientContactForm.controls['name'].setValue(data.name);
      this.clientContactForm.controls['email'].setValue(data.email);
      this.clientContactForm.controls['mobile'].setValue(data.mobile);
    });
  }

  editDesgination(selectedClientContact : IclientContacts)
  {
    if(this.selectedClientContact)
    {
      this.clientContactDialog = true;
      this.selectedClientContact = selectedClientContact;
      this.fetchTableData(selectedClientContact.contactId);
    }
    else
    {
      this.messageService.add({ severity: 'info', summary: 'Please select data you want to change' });
    }
  }

  deleteProduct(selectedClientContact : IclientContacts) {
    if(this.selectedClientContact)
    {
      this.deleteClientContactDialog = true;
      console.log(selectedClientContact.contactId);
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Please select data you want to delete',life: 1000});
    }
  }

  saveClient() {
    console.log(this.clientContactForm);
    if(this.selectedClientContact)
    {
      this.clientContactsService.updateClientContact(this.clientContactForm.value).subscribe(data =>
        {
        const index = this.clientContactList.findIndex((item) => item.contactId === data.contactId);
          if (index !== -1) {
            this.clientContactList[index] = data;
          }
        })
      this.messageService.add({ severity: 'success', summary: 'Successfuly Updated'});
    }
    else
    {
      this.clientContactsService.insertClientContact(this.clientContactForm.value).subscribe(data => {
       this.clientContactList.push(data);
      });
      this.messageService.add({ severity: 'success', summary: 'Successfuly Inserted'});
      this.clientContactForm.reset();
    }
    this.clientContactDialog = false;
    
  }

  confirmDelete(clientContact: IclientContacts) {
    this.clientContactsService.DeleteClientContact(clientContact.contactId).subscribe();
    this.clientContactList = this.clientContactList.filter(item => item.contactId !== clientContact.contactId);
    this.messageService.add({ severity: 'success', summary: 'Successfully Deleted' });
    this.deleteClientContactDialog = false;
  }
}