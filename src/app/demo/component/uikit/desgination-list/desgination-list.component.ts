import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from 'src/app/demo/service/designation.service';
import { Idesignation } from 'src/app/idesignation';

@Component({
  selector: 'app-desgination-list',
  templateUrl: './desgination-list.component.html',
  styleUrls: ['./desgination-list.component.css']
})
export class DesginationListComponent implements OnInit {

  designationList!: Idesignation[];
  designationDialog: boolean = false;
  deleteDesginationDialog: boolean = false;
  designationData!: Idesignation ;
  designationForm! : FormGroup;
  selectedDesignation!: Idesignation ;

  constructor(private designationService: DesignationService, private fb : FormBuilder) { }

  ngOnInit() {
      this.designationService.GetDesignation().subscribe(data => {
        this.designationList = data;
        console.log(this.designationList);
      })

      this.designationForm = this.fb.group({
        designationId : ['',[Validators.required]],
        designationName : ['', [Validators.required]]
      })

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
    this.designationDialog = true;
    this.fetchTableData(selectedDesignation.designationId);
  }

  deleteProduct(selectedDesignation : Idesignation) {
    this.deleteDesginationDialog = true;
    console.log(selectedDesignation.designationId);
  }

  saveDesignation() {
    console.log(this.designationForm);
    debugger
    if(this.selectedDesignation && this.selectedDesignation.designationId)
    {
      this.designationService.UpdateDesignation(this.designationForm.value).subscribe()
      this.designationDialog = false; 
      console.log("update");
    }
    else
    {
      this.designationService.InsertDesignation(this.designationForm.value).subscribe()
      this.designationDialog = false;  
    } 

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

  confirmDelete() {
    this.designationService.DeleteDesignation(this.selectedDesignation.designationId).subscribe();
    this.deleteDesginationDialog = false;
}
}
