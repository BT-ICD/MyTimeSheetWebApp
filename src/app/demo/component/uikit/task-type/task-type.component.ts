import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Itasktype } from 'src/app/demo/api/itasktype';
import { TasktypeService } from 'src/app/demo/service/tasktype.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.css'],
  providers: [MessageService]
})
export class TaskTypeComponent implements OnInit {

  taskTypeList!: Itasktype[];
  taskTypeDialog: boolean = false;
  deletetaskTypeDialog: boolean = false;
  taskTypeData!: Itasktype ;
  taskTypeForm! : FormGroup;
  selectedTaskType!: Itasktype ;
  cols!: Column[];

  constructor(private taskTypeService: TasktypeService, private fb : FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
      this.taskTypeService.GetAllTaskType().subscribe(data => {
        this.taskTypeList = data;
        console.log(this.taskTypeList);
      })

      this.taskTypeForm = this.fb.group({
        id : ['',[Validators.required]],
        typeShortName : ['', [Validators.required]],
        typeDescription : ['', [Validators.required]]
      })

      this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'typeShortName', header: 'TypeShortName' },
        { field: 'typeDescription', header: 'TypeDescription' },
    ];
  }

  fetchTableData(id : number)
  {
    this.taskTypeService.GetTaskTypeId(id).subscribe(data =>{
      console.log(data);
      this.taskTypeForm.controls['id'].setValue(data.id);
      this.taskTypeForm.controls['typeShortName'].setValue(data.typeShortName);
      this.taskTypeForm.controls['typeDescription'].setValue(data.typeDescription);
    });
  }

  hideDialog() {
    this.taskTypeDialog = false;
  }
  openNew() {
    this.taskTypeDialog = true;
  }

  editDesgination(selectedTaskType : Itasktype)
  {
    if(this.selectedTaskType)
    {
      this.taskTypeDialog = true;
      this.selectedTaskType = selectedTaskType;
      this.fetchTableData(selectedTaskType.id);
    }
    else
    {
      this.messageService.add({ severity: 'info', summary: 'Please select data you want to change' });
    }
  }

  deleteProduct(selectedTaskType : Itasktype) {
    if(this.selectedTaskType)
    {
      this.deletetaskTypeDialog = true;
      console.log(selectedTaskType.id);
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Please select data you want to delete',life: 1000});
    }
  }

  saveTaskType() {
    console.log(this.taskTypeForm);
    if(this.selectedTaskType)
    {
      this.taskTypeService.UpdateTaskType(this.taskTypeForm.value).subscribe()
      this.messageService.add({ severity: 'success', summary: 'Successfuly Updated'});
    }
    else
    {
      const duplicateName = this.taskTypeList.some(item => item.typeShortName === this.taskTypeForm.value.typeShortName);

      if (!duplicateName) 
      {
      this.taskTypeService.InsertTaskType(this.taskTypeForm.value).subscribe();
      this.messageService.add({ severity: 'success', summary: 'Successfuly Inserted'});
      }
      else
      {
        this.messageService.add({ severity: 'info', summary: `Task type with name "${this.taskTypeForm.value.typeShortName}" already exists.`});
      }
    }
    this.taskTypeDialog = false;

    // const isUpdate = this.selectedTaskType && this.selectedTaskType.designationId;
    // const formData = { ...this.taskTypeForm.value };
    // if (isUpdate) {
    //   formData.designationId = this.selectedTaskType.designationId;
    // }
    // const apiCall = isUpdate ? this.designationService.UpdateDesignation(formData): this.designationService.InsertDesignation(formData);

    // apiCall.subscribe(() => {
    //   console.log(isUpdate ? "Update successful" : "Insert successful");
    //   this.taskTypeDialog = false;
    // });
  }

  confirmDelete(taskType : Itasktype) {
    this.taskTypeService.DeleteTaskType(taskType.id).subscribe();
    this.taskTypeList = this.taskTypeList.filter(item => item.id !== taskType.id);
    this.messageService.add({ severity: 'success', summary: 'Successfuly Deleted'});
    this.deletetaskTypeDialog = false;
}
exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.taskTypeList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'taskTypeList');
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
