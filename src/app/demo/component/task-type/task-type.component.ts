import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Itasktype } from 'src/app/demo/api/itasktype';
import { TasktypeService } from 'src/app/demo/service/tasktype.service';
import { CustomtoastComponent } from '../customtoast/customtoast.component';
import { ProjectService } from '../../service/project.service';

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
  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;
  
  constructor(private taskTypeService: TasktypeService, private fb : FormBuilder, private messageService: MessageService, private projectService : ProjectService) { }

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

  editTaskType(selectedTaskType : Itasktype)
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

  deleteTaskType(selectedTaskType : Itasktype) {
    if(this.selectedTaskType)
    {
      this.deletetaskTypeDialog = true;
      console.log(selectedTaskType.id);
    }
    else {
      this.customToast.showSelecteDataDeletedToast();
    }
  }

  normalizetypeShortName(typeShortName: string): string {
    return typeShortName.toLowerCase();
  }

  saveTaskType() {
    console.log(this.taskTypeForm);

    const newtypeShortName = this.normalizetypeShortName(this.taskTypeForm.value.typeShortName);
    const isUpdate = !!this.selectedTaskType;

    const normalizedtypeShortNames = this.taskTypeList.map(item => this.normalizetypeShortName(item.typeShortName));

    if (normalizedtypeShortNames.includes(newtypeShortName)) {
      this.messageService.add({
        severity: 'error',
        summary: `TaskShort name "${newtypeShortName}" already exists.`
      });
    }
    else{
      if(isUpdate)
      {
        this.taskTypeService.UpdateTaskType(this.taskTypeForm.value).subscribe()
        this.customToast.showSuccessToast("Updated Successfuly");
      }
      else{
        this.taskTypeService.InsertTaskType(this.taskTypeForm.value).subscribe();
        this.customToast.showSuccessToast("Inserted Successfuly");
      }
    }
    this.taskTypeForm.reset();
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
