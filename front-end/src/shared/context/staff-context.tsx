import React, { createContext, useState } from 'react';
import { Person } from 'shared/models/person';
import { SortOrder, SortBy, StateList, RollInfo } from 'staff-app/daily-care/interfaces';

export type StaffContext = {
  students: Person[];
  studentsView: Person[];
  sortOrder: SortOrder;
  sortBy: SortBy;
  searchQuery: string;
  isRollMode: boolean;
  currentRoll: RollInfo[];
};

const initialState: StaffContext = {
  students: [],
  studentsView: [],
  sortOrder: 'ascending',
  sortBy: 'first-name',
  searchQuery: '',
  isRollMode: false,
  currentRoll: [],
};

export const StaffContext = createContext({
  boardingData: initialState,
  updateStore: (data: Partial<StaffContext>) => {},
});

type StaffContextProviderProps = {
  children: React.ReactNode;
};

export const StaffContextProvider = ({ children }: StaffContextProviderProps) => {
  const [boardingData, setBoardingData] = useState(initialState);

  const updateStore = (data: Partial<StaffContext>) => {
    setBoardingData({ ...boardingData, ...data });
  };

  return <StaffContext.Provider value={{ boardingData, updateStore }}>{children}</StaffContext.Provider>;
};
