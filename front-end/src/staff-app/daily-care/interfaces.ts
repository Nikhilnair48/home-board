import { StaffContext } from 'shared/context/staff-context';
import { RollStateType } from 'shared/models/roll';

export type ToolbarAction = 'roll' | 'sort';

export type SortOrder = 'ascending' | 'descending';
export type SortBy = 'first-name' | 'last-name' | 'none';
export type PartialStaffContext = Partial<StaffContext>;

export interface SortIconProps {
  sortOrder: SortOrder;
}

export interface SortableHeaderProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
  sortOrder: SortOrder;
}

export type ItemType = RollStateType | 'all';

export type StateList = {
  type: ItemType;
  count: number;
};

export interface RollInfo {
  studentId: number;
  rollState: RollStateType;
}
