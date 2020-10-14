import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHttpComponent implements OnInit {
  addEditForm  = new FormGroup({});
  submitted = false;
  public headerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.initForm();
  }

  ngOnInit() {
    (this.addEditForm.get('headers') as FormArray).valueChanges.subscribe(
      result => {
          let dta = result[result.length-1];
          if(dta.key){
            this.addHeaders();
          }

      });

      (this.addEditForm.get('bodys') as FormArray).valueChanges.subscribe(
        result => {
          let dta = result[result.length-1];
          if(dta.key){
            this.addBodys();
          }
            // if(this.bodys().valid){
            //   this.addBodys();
            // }

        });
  }

  initForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.addEditForm = this.formBuilder.group({
      method: new FormControl('GET'),
      url: new FormControl('', [Validators.required, Validators.pattern(reg)]),
      contentType: new FormControl('application/json'),
      type: new FormControl('body'),
      jsonTextArea: new FormControl(''),
      headers: this.formBuilder.array([ this.createHeaders() ]),
      bodys : this.formBuilder.array([ this.createBodys() ]),
    });
  }

  createHeaders() {
    return this.formBuilder.group({
        key: new FormControl(''),
        value: new FormControl(''),
    });
  }

  headers() : FormArray {
    return this.addEditForm.get("headers") as FormArray
  }

  addHeaders(): void {
    //this.headers = this.addEditForm.get('headers') as FormArray;
    this.headers().push(this.createHeaders());
  }

  getValidity(i) {
    return this.headers().controls[i].invalid;
  }

   headerControls() {
    return this.addEditForm.get('headers')['controls'];
  }

  removeHeader(i: number){
    this.headers().removeAt(i);
  }

  createBodys() {
    return this.formBuilder.group({
        key: new FormControl(''),
        value: new FormControl(''),
    });
  }

  bodys() : FormArray {
    return this.addEditForm.get("bodys") as FormArray
  }

  addBodys(): void {
    //this.headers = this.addEditForm.get('headers') as FormArray;
    this.bodys().push(this.createBodys());
  }

   bodyControls() {
    return this.addEditForm.get('bodys')['controls'];
  }

  removeBody(i: number){
    this.bodys().removeAt(i);
  }

  onSubmit(){
    this.submitted = true;
    const result = { method:'', contentType:'', url:'', headers:{} , body: {},};
    result.method = this.addEditForm.value.method;
    result.contentType = this.addEditForm.value.contentType;
    result.url = this.addEditForm.value.url;
    const obj = {

    };
    const obj1 = {

    };
    for (let index = 0; index < this.addEditForm.value.headers.length; index++) {
      const element = this.addEditForm.value.headers[index];
      if (element.key) {
        obj[element.key] = element.value;
      }
    }

    for (let index = 0; index < this.addEditForm.value.bodys.length; index++) {
      const element = this.addEditForm.value.bodys[index];
      if (element.key) {
        obj1[element.key] = element.value;
      }
    }

    result.headers = obj;
    if(this.addEditForm.value.contentType == 'application/json'){
      result.body = this.addEditForm.value.jsonTextArea;
    }else{
      result.body = obj1;
    }


    if (this.addEditForm.invalid) {
      return;
    }
    console.log(result);
  }



  validation_messages = {
    'url': [
      { type: 'required', message: 'Please enter valid URL' }
    ],
  }

}
