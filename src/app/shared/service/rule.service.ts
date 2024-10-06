// services/rule.service.ts
import { Injectable } from '@angular/core';
import { Rule } from '../model/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private rowData: Rule[] = [
    {
      id: 997,
      ruleName: '2DS - Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: '',
      impacted: 0,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 996,
      ruleName: 'Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: '',
      impacted: 0,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
    {
      id: 986,
      ruleName: 'File Monitor',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: '',
      impacted: 57994,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 985,
      ruleName: 'testreve1',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: '',
      impacted: 13773,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
  ];

  getRowData(): Rule[] {
    return this.rowData;
  }

  getSingleRowData(id : number) : any{
    const singleRowData = this.rowData.find(element => element.id == id);
    return singleRowData;
  }
}
