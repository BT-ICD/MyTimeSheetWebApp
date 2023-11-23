import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Iproject } from '../../api/iproject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomtoastComponent } from '../customtoast/customtoast.component';
import { ProjectService } from '../../service/project.service';
import { MessageService } from 'primeng/api';
import { Iclient } from '../../api/iclient';
import { ClientService } from '../../service/client.service';
import { DatePipe } from '@angular/common';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [MessageService, DatePipe],
  encapsulation: ViewEncapsulation.None 
})
export class ProjectComponent implements OnInit{

  projectList!: Iproject[];
  projectDialog: boolean = false;
  deleteProjectDialog: boolean = false;
  projectForm! : FormGroup;
  selectedProject!: Iproject;
  cols!: Column[];
  clientList! : Iclient[];
  clientNames !: string[];

  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;

  constructor(private projectService: ProjectService, private fb : FormBuilder, private messageService: MessageService, private clientService : ClientService,private datePipe: DatePipe) { }

  ngOnInit() {
      this.projectService.getAllProject().subscribe(data => {
        this.projectList = data;
      });
     
      this.projectForm = this.fb.group({
        projectId : ['',[Validators.required]],
        name : ['', [Validators.required]],
        //clientId : ['', [Validators.required]],
        initiatedOn : ['', [Validators.required]],
        clientName : ['', [Validators.required]]
      })

      this.clientService.GetAllClients().subscribe(data =>
        {
          this.clientList = data;
          console.log("clientList",data);
          this.clientNames = data.map(x=>x.name);
        }
      );

      this.cols = [
        { field: 'projectId', header: 'ProjectId' },
        { field: 'name', header: 'Name' },
        { field: 'clientId', header: 'ClientId' },
        { field: 'initiatedOn', header: 'initiatedOn' },     
    ];
 
  }


  fetchTableData(id : number)
  {
    this.projectService.getProjectById(id).subscribe(data =>{
      console.log(data);
      const initiatedOn = data.initiatedOn;
      // this.projectForm.controls['projectId'].setValue(data.projectId);
      // this.projectForm.controls['name'].setValue(data.name);
      // //this.projectForm.controls['clientId'].setValue(data.clientId);
      // this.projectForm.controls['initiatedOn'].setValue(data.initiatedOn);
      // this.projectForm.controls['clientName'].setValue(data.clientName);

      const formattedDateBirth = this.datePipe.transform(new Date(initiatedOn), 'yyyy-MM-dd');

      this.projectForm.setValue({
        projectId : data.projectId,
        name : data.name,
        initiatedOn : formattedDateBirth,
        clientName : data.clientName
      })
    });
  }


  hideDialog() {
    this.projectDialog = false;
  }

  openNew() {
    this.projectDialog = true;
   
  }
 
  editProject(selectedProject : Iproject)
  {
    if(this.selectedProject)
    {
      this.projectDialog = true;
      this.selectedProject = selectedProject;
      this.fetchTableData(selectedProject.projectId);
    }
    else
    {
      this.customToast.showSelectDataToast();
    }
  }

  deleteProject(selectedProject : Iproject) {
    if(this.selectedProject)
    {
      this.deleteProjectDialog = true;
      console.log(selectedProject.projectId);
    }
    else {
      this.customToast.showSelecteDataDeletedToast();
    }
  }

  saveProject() {
    console.log(this.projectForm);
    debugger;
    const formData = { ...this.projectForm.value };
    const selectedClient = this.clientList.find(d => d.name == formData.clientName);
     
    const formattedDate = this.datePipe.transform(formData.initiatedOn, 'yyyy-MM-dd');
    formData.initiatedOn = formattedDate;

    if (selectedClient) {
      formData.clientId = selectedClient.clientId;
    }
    
    console.log(formData);
    if(this.selectedProject)
    {
      // debugger
      console.log(formData);
      this.projectService.UpdateProject(formData).subscribe()
      this.customToast.showSuccessToast("Updated Successfuly");
    }
    else
    {
      this.projectService.InsertProject(formData).subscribe();
      this.customToast.showSuccessToast("Inserted Successfuly");
      this.projectForm.reset();
    }
    this.projectForm.reset();
    this.projectDialog = false;

  }

  confirmDelete(client : Iproject) {
    this.projectService.DeleteProject(client.projectId).subscribe();
    this.projectList = this.projectList.filter(item => item.projectId !== client.projectId);
    this.messageService.add({ severity: 'success', summary: 'Successfuly Deleted'});
    this.deleteProjectDialog = false;
}
exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.projectList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'projectList');
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
