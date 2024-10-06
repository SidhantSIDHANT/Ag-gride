import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RuleService } from '../../service/rule.service';
import { Rule } from '../../model/rule.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() selectedRowData!: any;
  selectedRuleData!: Rule;
  ruleForm!: FormGroup;
  updatedRowData!: Rule;
  newRowData!: Rule;
  @Output() eventEmitter: EventEmitter<Rule> = new EventEmitter();
  @Output() emitNewRowData : EventEmitter<Rule> = new EventEmitter();
  uuid!: number;

  constructor(private _ruleService: RuleService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedRowData && changes.selectedRowData.currentValue) {
      this.patchFormData(changes.selectedRowData.currentValue);
    }
  }

  ngOnInit(): void {
    this.initializeRuleForm();
    this.uuid = Math.floor(Math.random() * 100000);
   
  }

  initializeRuleForm() {
    this.ruleForm = new FormGroup({
      ruleName: new FormControl(''),
      isActive: new FormControl(''),
      ruleType: new FormControl(''),
      subType: new FormControl(''),
      domain: new FormControl(''),
      impacted: new FormControl(''),
      isFavourite: new FormControl(''), // More descriptive
      isScheduled: new FormControl(''), // More descriptive
      lastScheduledDate: new FormControl(''),
      alertStatus: new FormControl(''), // More descriptive
    });
  }

  patchFormData(ruleData: any) {
    this.ruleForm.patchValue({
      ruleName: ruleData?.ruleName,
      isActive: ruleData?.active,
      ruleType: ruleData?.type,
      subType: ruleData?.subType,
      domain: ruleData?.domain,
      impacted: ruleData?.impacted,
      isFavourite: ruleData?.favourite,
      isScheduled: ruleData?.scheduled,
      lastScheduledDate: ruleData?.lastScheduledDate,
      alertStatus: ruleData?.alert,
    });
  }

  onRuleUpdated(id: number) {
    this.updatedRowData = { ...this.ruleForm.value, id: id };
    if (this.ruleForm.valid) {
      this.eventEmitter.emit(this.updatedRowData);
      this.ruleForm.reset();
    }
  }

  addNewrowData() {
    this.newRowData = {...this.ruleForm.value, id : this.uuid};
    console.log(this.newRowData);
    console.log(this.uuid)
    if (this.ruleForm.valid) {
      this.emitNewRowData.emit(this.newRowData);
    }
  }
}
