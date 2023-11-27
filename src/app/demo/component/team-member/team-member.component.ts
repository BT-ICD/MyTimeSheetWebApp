import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TeamMemberService } from 'src/app/demo/service/team-member.service';
import { CustomtoastComponent } from '../customtoast/customtoast.component';
import { IteamMember } from 'src/app/demo/api/iteam-member';
import * as FileSaver from 'file-saver';
import { Idesignation } from 'src/app/idesignation';
import { DesignationComponent } from '../designation/designation.component';
import { DesignationService } from 'src/app/demo/service/designation.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-team-memeber',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css'],
  providers: [MessageService, DatePipe]
})
export class TeamMemberComponent implements OnInit{

  teamMemberList!: IteamMember[];
  teamMemberDialog: boolean = false;
  deleteTeamMemberDialog: boolean = false;
  teamMemberForm! : FormGroup;
  selectedTeamMember!: IteamMember;
  cols!: Column[];
  designationNames: string[] = [];
  designationList !: Idesignation[];
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;

  constructor(private teamMemberService: TeamMemberService, private fb : FormBuilder, private messageService: MessageService, private designationService : DesignationService ,private datePipe: DatePipe) { }

  ngOnInit() {
      this.teamMemberService.getAllTeamMember().subscribe(data => {
        this.teamMemberList = data;
      });
     
      this.teamMemberForm = this.fb.group({
        teamMemberId : ['',[Validators.required]],
        name : ['', [Validators.required]],
        mobile : ['', [Validators.required]],
        email : ['', [Validators.required]],
        notes : ['', [Validators.required]],
        alternateContact : ['', [Validators.required]],
        dob : ['', [Validators.required]],
        doj : ['', [Validators.required]],
        designationName : ['', [Validators.required]],
      })

      this.cols = [
        { field: 'teamMemberId', header: 'TeamMemberId' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'mobile', header: 'Mobile' },
        { field: 'notes', header: 'Notes' },
        { field: 'alternateContact', header: 'AlternateContact' },
        { field: 'dob', header: 'Date of birth' },
        { field: 'doj', header: 'Date of join' },
        { field: 'designationName', header: 'DesignationName'},
    ];
 
    this.designationService.GetDesignation().subscribe(data =>{
      this.designationList = data;
      this.designationNames = data.map(x=> x.designationName);
      console.log("designation===>",this.designationList);
    });
  }


  fetchTableData(id : number)
  {
    this.teamMemberService.getTeamMemberById(id).subscribe(data =>{
      console.log(data);
      const dataofbirth = data.dob;
      const dateofjoin = data.doj;
      //const datePipe = new DatePipe('en-US');
      //const formattedDateBirth = this.datePipe.transform(new Date(dataofbirth), 'yyyy-MM-dd');
      //const formattedDateJoin = this.datePipe.transform(new Date(dateofjoin), 'yyyy-MM-dd');

      // this.teamMemberForm.controls['teamMemberId'].setValue(data.teamMemberId);
      // this.teamMemberForm.controls['name'].setValue(data.name);
      // this.teamMemberForm.controls['email'].setValue(data.email);
      // this.teamMemberForm.controls['mobile'].setValue(data.mobile);
      // this.teamMemberForm.controls['notes'].setValue(data.notes);
      // this.teamMemberForm.controls['alternateContact'].setValue(data.alternateContact);
      // this.teamMemberForm.controls['dob'].setValue(formattedDateBirth);
      // this.teamMemberForm.controls['doj'].setValue(formattedDateJoin);
      // this.teamMemberForm.controls['designationName'].setValue(data.designationName);

      this.teamMemberForm.setValue({
        teamMemberId: data.teamMemberId,
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        notes: data.notes,
        alternateContact: data.alternateContact,
        dob: data.dob,
        doj: data.doj,
        designationName: data.designationName 
      });
    });

   
  }

  hideDialog() {
    this.teamMemberDialog = false;
  }

  openNew() {
    this.teamMemberDialog = true;
   
  }
 
  editTeamMember(selectedTeamMember : IteamMember)
  {
    if(this.selectedTeamMember)
    {
      this.teamMemberDialog = true;
      this.selectedTeamMember = selectedTeamMember;
      this.fetchTableData(selectedTeamMember.teamMemberId);
    }
    else
    {
      this.customToast.showSelectDataToast();
    }
  }

  deleteTeamMember(selectedTeamMember : IteamMember) {
    if(this.selectedTeamMember)
    {
      this.deleteTeamMemberDialog = true;
      console.log(selectedTeamMember.teamMemberId);
    }
    else {
      this.customToast.showSelecteDataDeletedToast();
    }
  }

  saveTeamMember() {
    console.log(this.teamMemberForm);
    
    const formData = { ...this.teamMemberForm.value };
    const selectedDesignation = this.designationList.find(d => d.designationName == formData.designationName);

    // const formattedDOB = this.datePipe.transform(formData.dob, 'yyyy-MM-dd');
    // formData.dob = formattedDOB;

    // const formattedDOJ = this.datePipe.transform(formData.doj, 'yyyy-MM-dd');
    // formData.doj = formattedDOJ;

    if (selectedDesignation) {
      formData.designationId = selectedDesignation.designationId; 
    }

    console.log(formData);


    if(this.selectedTeamMember)
    {
      // debugger
      console.log(formData);
      this.teamMemberService.UpdateTeamMember(formData).subscribe()
      this.customToast.showSuccessToast("Updated Successfuly");
    }
    else
    {
      this.teamMemberService.InsertTeamMember(formData).subscribe();
      this.customToast.showSuccessToast("Inserted Successfuly");
      this.teamMemberForm.reset();
    }
    this.teamMemberForm.reset();
    this.teamMemberDialog = false;

  }

  confirmDelete(teamMember : IteamMember) {
    this.teamMemberService.DeleteTeamMember(teamMember.teamMemberId).subscribe();
    this.teamMemberList = this.teamMemberList.filter(item => item.teamMemberId !== teamMember.teamMemberId);
    this.messageService.add({ severity: 'success', summary: 'Successfuly Deleted'});
    this.deleteTeamMemberDialog = false;
}
exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.teamMemberList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'teamMemberList');
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