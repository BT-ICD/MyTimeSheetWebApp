import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DesignationService } from 'src/app/demo/service/designation.service';
import { Idesignation } from 'src/app/idesignation';
import { CustomtoastComponent } from '../customtoast/customtoast.component';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
  providers: [MessageService]
})
export class DesignationComponent implements OnInit {

  designationList!: Idesignation[];
  designationDialog: boolean = false;
  deleteDesginationDialog: boolean = false;
  designationData!: Idesignation ;
  designationForm! : FormGroup;
  selectedDesignation!: Idesignation ;
  cols!: Column[];
  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;

  constructor(private designationService: DesignationService, private fb : FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    console.log("designation component");
      this.designationService.GetDesignation().subscribe(data => {
        const list = this.designationService.setDesignationList(data);
        console.log(" desingationlist", list);
        this.designationList = data;
        localStorage.setItem('designationList', JSON.stringify(this.designationList));
      })

      this.designationForm = this.fb.group({
        designationId : ['',[Validators.required]],
        designationName : ['', [Validators.required]]
      })

      this.cols = [
        { field: 'designationId', header: 'DesignationId' },
        { field: 'designationName', header: 'DesignationName' },
    ];
    
  }

  fetchTableData(id : number)
  {
    this.designationService.GetDesignationById(id).subscribe(data =>{
      console.log(data);
      this.designationForm.controls['designationId'].setValue(data.designationId);
      this.designationForm.controls['designationName'].setValue(data.designationName);
    });
  }

  hideDialog() {
    this.designationDialog = false;
  }
  openNew() {
    this.designationDialog = true;
  }

  editDesgination(selectedDesignation : Idesignation)
  {
    if(this.selectedDesignation)
    {
      this.designationDialog = true;
      this.selectedDesignation = selectedDesignation;
      this.fetchTableData(selectedDesignation.designationId);
    }
    else
    {
      this.customToast.showSelectDataToast();
    }
  }

  deleteDesignation(selectedDesignation : Idesignation) {
    if(this.selectedDesignation)
    {
      this.deleteDesginationDialog = true;
      console.log(selectedDesignation.designationId);
    }
    else {
      this.customToast.showSelecteDataDeletedToast();
    }
  }

  normalizeDesignationName(designationName: string): string {
    return designationName.toLowerCase();
  }

  saveDesignation() {
    debugger
    console.log(this.designationForm);
    
    const newDesignationName = this.normalizeDesignationName(this.designationForm.value.designationName);
    const isUpdate = !!this.selectedDesignation;

    const normalizedDesignationNames = this.designationList.map(item => this.normalizeDesignationName(item.designationName));

    if (normalizedDesignationNames.includes(newDesignationName)) {
      this.messageService.add({
        severity: 'error',
        summary: `Designation name "${newDesignationName}" already exists.`
      });
    }
  else{
    if(isUpdate)
    {
      this.designationService.UpdateDesignation(this.designationForm.value).subscribe()
      this.customToast.showSuccessToast("Updated Successfuly");
    }
    else{
       this.designationService.InsertDesignation(this.designationForm.value).subscribe();
      this.customToast.showSuccessToast("Inserted Successfuly");
  }
  }

    this.designationForm.reset();
    this.designationDialog = false;

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

  confirmDelete(desgination : Idesignation) {
    this.designationService.DeleteDesignation(desgination.designationId).subscribe();
    this.designationList = this.designationList.filter(item => item.designationId !== desgination.designationId);
    this.messageService.add({ severity: 'success', summary: 'Successfuly Deleted'});
    this.deleteDesginationDialog = false;
}
exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.designationList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'designationList');
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

