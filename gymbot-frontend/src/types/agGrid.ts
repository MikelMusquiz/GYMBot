import type { ColDef, ColGroupDef, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import type { RowData } from './index';

// Type-safe column definition for exercise columns
export interface ExerciseColumnDef extends ColDef<RowData> {
  field: string;
  headerName: string;
  editable: boolean;
  valueGetter: (params: ValueGetterParams<RowData>) => number | null;
  valueSetter: (params: ValueSetterParams<RowData>) => boolean;
}

// Week column definition
export interface WeekColumnDef extends ColDef<RowData> {
  field: 'week';
  headerName: 'Week';
  pinned: 'left';
  editable: false;
}

// Category group definition
export interface CategoryGroupDef extends ColGroupDef<RowData> {
  headerName: 'PUSH' | 'PULL' | 'LEG';
  headerClass: 'category-header-push' | 'category-header-pull' | 'category-header-leg';
  children: ExerciseColumnDef[];
}

// Union type for all possible column definitions
export type ColumnDefType = WeekColumnDef | CategoryGroupDef | ExerciseColumnDef;
