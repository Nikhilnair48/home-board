import React, { createContext, useState } from 'react';
import { Person } from 'shared/models/person';
import { SortOrder, SortBy } from 'staff-app/daily-care/interfaces';

export type StaffContextProps = {
  students: Person[];
  studentsView: Person[];
  sortOrder: SortOrder;
  sortBy: SortBy;
};

const initialState: StaffContextProps = {
  students: [],
  studentsView: [],
  sortOrder: 'none',
  sortBy: 'none',
};

export const StaffContext = createContext({
  boardingData: initialState,
  updateStore: (data: StaffContextProps) => {},
});

export const StaffContextProvider = ({ children }: any) => {
  const [boardingData, setBoardingData] = useState(initialState);

  const updateStore = (data: StaffContextProps) => {
    setBoardingData({ ...boardingData, ...data });
  };

  return <StaffContext.Provider value={{ boardingData, updateStore }}>{children}</StaffContext.Provider>;
};
