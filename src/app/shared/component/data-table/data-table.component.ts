import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { Rule } from '../../model/rule.model';
import { RuleService } from '../../service/rule.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  rowData: Rule[] = [];
  colDefs: ColDef[] = [];
  selectedRows: Rule[] = [];
  themeClass = 'ag-theme-alpine';
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  selectedRowData!: number;
  selectedDropdown: string | undefined;

  showFavouriteColumn = true;
  showruleName = true;
  showActive = true;
  showType = true;
  showImpacted = true;
  showScheduled = true;
  showLastScheduledDate = true;
  showButton = true;

  constructor(private ruleService: RuleService) {}

  ngOnInit(): void {
    this.rowData = this.ruleService.getRowData();
    this.colDefs = this.getColumnDefs();
  }

  private getColumnDefs(): ColDef[] {
    return [
      {
        field: 'ruleName',
        headerName: 'Rule Name',
        sortable: true,
        filter: true,
        hide: !this.showruleName,
      },
      {
        field: 'active',
        headerName: 'Active',
        sortable: true,
        filter: true,
        hide: !this.showActive,
      },
      {
        field: 'type',
        headerName: 'Type',
        sortable: true,
        filter: true,
        hide: !this.showType,
      },
      {
        field: 'impacted',
        headerName: 'Impacted',
        sortable: true,
        filter: true,
        hide: !this.showImpacted,
      },
      {
        field: 'scheduled',
        headerName: 'Scheduled',
        sortable: true,
        filter: true,
        hide: !this.showScheduled,
      },
      {
        field: 'lastScheduledDate',
        headerName: 'Last Scheduled Date',
        sortable: true,
        filter: true,
        hide: !this.showLastScheduledDate,
      },
      {
        field: 'favourite',
        headerName: 'Favourite',
        sortable: true,
        filter: true,
        hide: !this.showFavouriteColumn,
      },
      {
        field: 'button',
        hide: !this.showButton,
        cellRenderer: this.buttonCellRenderer.bind(this),
      },
    ];
  }

  onCellClicked(event: any) {
    const clickedId = event.data.id; 
    this.selectedRowData = event.data;
  }

  buttonCellRenderer(params: any) {
    const button = document.createElement('button');
    button.innerText = 'Edit';
    button.classList.add('btn', 'btn-info');
    button.addEventListener('click', () => {
      this.onCellClicked(params);
    });
    return button;
  }

  onSelectionChanged(): void {
    this.selectedRows = this.gridApi
      .getSelectedNodes()
      .map((node) => node.data);
  }

  private updateColumnDefs(): void {
    this.colDefs = this.getColumnDefs();
    this.gridApi.setColumnDefs(this.colDefs);
  }

  toggleColumn(event: any) {
    const value = event.value;
    console.log(value)
    switch (value.toLowerCase()) {
      case 'type':
        this.showType = !this.showType;
        break;
      case 'ruleName'.toLowerCase():
        this.showruleName = !this.showruleName;
        break;
      case 'active'.toLowerCase():
        this.showActive = !this.showActive;
        break;
      case 'impacted'.toLowerCase():
        this.showImpacted = !this.showImpacted;
        break;
      case 'impacted'.toLowerCase():
        this.showImpacted = !this.showImpacted;
        break;
      case 'scheduled'.toLowerCase():
        this.showScheduled = !this.showScheduled;
        break;
      case 'lastScheduledDate'.toLowerCase():
        this.showLastScheduledDate = !this.showLastScheduledDate;
        break;
      case 'favourite'.toLowerCase():
        this.showFavouriteColumn = !this.showFavouriteColumn;
        break;
      default:
        this.showButton = !this.showButton;
        break;
    }
    this.updateColumnDefs();
  }

  gridOptions = {
    onGridReady: (params: any) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();

      this.selectFirstRow();
    },
    onSelectionChanged: () => {
      this.onSelectionChanged();
    },
  };

  private selectFirstRow(): void {
    const firstNode = this.gridApi.getDisplayedRowAtIndex(0);
    if (firstNode) {
      firstNode.setSelected(true);
      this.selectedRowData = firstNode.data;
    }
  }

  getUpdatedRuleData(rowData: Rule) {
    const updatedRowData = this.rowData.map((element) =>
      element.id === rowData.id ? { ...element, ...rowData } : element
    );
    this.gridApi.setRowData(updatedRowData);
    console.log("Update the data :- "+ JSON.stringify(rowData ));
  }

  addNewRow(rowData: Rule) {
    this.rowData.push(rowData);
    this.gridApi.setRowData(this.rowData);
    console.log("New data is inserted :- "+ JSON.stringify(rowData) );
  }
}
