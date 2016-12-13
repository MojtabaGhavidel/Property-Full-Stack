import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './melk.component.html',
  styleUrls: ['./melk.component.css']
})
export class SubmitComponent implements OnInit {

  private melks = [];
  private isLoading = true;

  private melk = {};
  private isEditing = false;

  private addMelkForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private age = new FormControl("", Validators.required);
  private weight = new FormControl("", Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMelks();

    this.addMelkForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getMelks() {
    this.dataService.getMelks().subscribe(
      data => this.melks = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addMelk() {
    this.dataService.addMelk(this.addMelkForm.value).subscribe(
      res => {
        var newMelk = res.json();
        this.melks.push(newMelk);
        this.addMelkForm.reset();
        this.toast.setMessage("item added successfully.", "success");
      },
      error => console.log(error)
    );
  }

  enableEditing(melk) {
    this.isEditing = true;
    this.melk = melk;
  }

  cancelEditing() {
    this.isEditing = false;
    this.melk = {};
    this.toast.setMessage("item editing cancelled.", "warning");
    // reload the cats to reset the editing
    this.getMelks();
  }

  editMelk(melk) {
    this.dataService.editMelk(melk).subscribe(
      res => {
        this.isEditing = false;
        this.melk = melk;
        this.toast.setMessage("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteMelk(melk) {
    if(window.confirm("Are you sure you want to permanently delete this item?")) {
      this.dataService.deleteMelk(melk).subscribe(
        res => {
          var pos = this.melks.map(melk => { return melk._id }).indexOf(melk._id);
          this.melks.splice(pos, 1);
          this.toast.setMessage("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }

}
