export type ToolbarAction = 'roll' | 'sort';

export type SortOrder = 'none' | 'ascending' | 'descending';
export type SortBy = 'first-name' | 'last-name' | 'none';

export interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
}

export interface SortableHeaderProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
  sortOrder: SortOrder;
}
