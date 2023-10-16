import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customtoast',
  templateUrl: './customtoast.component.html',
  styleUrls: ['./customtoast.component.css']
})
export class CustomtoastComponent {

  constructor(private messageService : MessageService) {  }

  showSuccessToast(message : string)
  {
    this.messageService.add({ severity: 'success', summary: 'Success', detail : message});
  }

  // showSuccessToast()
  //  {
  //    this.messageService.add({ severity: 'success', summary: 'Success', detail : "Updated Successfully"});
  //  }

  showSelecteDataDeletedToast()
  {
    this.messageService.add({ severity: 'info', summary: 'Info', detail : 'Please select data you want to delete'});
  }

  showSelectDataToast()
  {
    this.messageService.add({ severity: 'info', summary: 'Please select data you want to change'});
  }
  

}
