import { StaffContext } from 'shared/context/staff-context';

export type ToolbarAction = 'roll' | 'sort';

export type SortOrder = 'ascending' | 'descending';
export type SortBy = 'first-name' | 'last-name' | 'none';
export type PartialStaffContext = Partial<StaffContext>;

export interface SortIconProps {
  sortOrder: SortOrder;
}

export interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
}

export interface SortableHeaderProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
  sortOrder: SortOrder;
}
