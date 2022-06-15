import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spacing, BorderRadius, FontWeight } from 'shared/styles/styles';
import { Colors } from 'shared/styles/colors';
import { Box, ButtonGroup, Input, TextField } from '@material-ui/core';
import { PartialStaffContext, SortBy, SortIconProps, SortOrder, ToolbarProps } from './interfaces';
import { StaffContext } from 'shared/context/staff-context';
import { Person } from 'shared/models/person';

const SortIcon = (props: SortIconProps) => {
  const { sortOrder } = props;

  const renderSortIcon = () => {
    switch (sortOrder) {
      case 'none':
        return null;
      case 'ascending':
        return <FontAwesomeIcon icon="arrow-down" size="sm" />;
      case 'descending':
        return <FontAwesomeIcon icon="arrow-up" size="sm" />;
    }
  };

  return <>{renderSortIcon()}</>;
};

const SortableHeader: React.FC<{}> = () => {
  const { boardingData, updateStore } = useContext(StaffContext);

  const getSortOrderAndStudentsView = (key: keyof Pick<Person, 'first_name' | 'last_name'>, sortOrder: SortOrder) => {
    const { studentsView } = boardingData;
    const result: PartialStaffContext = {};

    if (sortOrder === 'ascending') {
      result.sortOrder = 'descending';
      result.studentsView = studentsView.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    } else {
      result.sortOrder = 'ascending';
      result.studentsView = studentsView.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
    return result;
  };

  const onColumnSelection = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const { sortBy, sortOrder } = boardingData;
    if (target.id !== sortBy) {
      updateStore({
        sortBy: target.id as SortBy,
        sortOrder: 'ascending',
        ...getSortOrderAndStudentsView(target.id === 'first-name' ? 'first_name' : 'last_name', 'ascending'),
      });
    } else {
      updateStore({
        ...getSortOrderAndStudentsView(target.id === 'first-name' ? 'first_name' : 'last_name', sortOrder),
      });
    }
  };

  return (
    <S.SortableHeader>
      <Box>Sort By:</Box>
      <ButtonGroup variant="contained" size="small" disableElevation onClick={onColumnSelection}>
        <S.Button isActive={boardingData.sortBy === 'first-name'} id="first-name">
          First Name
        </S.Button>
        <S.Button isActive={boardingData.sortBy === 'last-name'} id="last-name">
          Last Name
        </S.Button>
      </ButtonGroup>
      <SortIcon sortOrder={boardingData.sortOrder} />
    </S.SortableHeader>
  );
};

const Search = () => {
  const { boardingData, updateStore } = useContext(StaffContext);
  const { searchQuery } = boardingData;
  const filterStudent = (keyword: string, student: Person): boolean => {
    const { first_name, last_name } = student;
    const full_name = first_name.concat(' ', last_name).toLowerCase();

    if (
      first_name.toLowerCase().includes(keyword) ||
      last_name.toLowerCase().includes(keyword) ||
      full_name.includes(keyword)
    )
      return true;
    return false;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    if (event) {
      const { students } = boardingData;
      const { value } = event.target;
      updateStore({
        studentsView: students.filter((student) => filterStudent(value, student)),
        searchQuery: value,
      });
    }
  };

  return (
    <S.Search onChange={handleSearchChange}>
      <Input placeholder="Search" value={searchQuery} />
    </S.Search>
  );
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props;
  return (
    <S.ToolbarContainer>
      <SortableHeader />
      <Search />
      <S.Button isActive onClick={() => onItemClick('roll')}>
        Start Roll
      </S.Button>
    </S.ToolbarContainer>
  );
};

const S = {
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  SortableHeader: styled.div`
    display: flex;
    width: 5rem;
    align-items: center;
    & div.MuiBox-root {
      padding-right: 5px;
    }
  `,
  Search: styled(TextField)`
    & .MuiInputBase-input {
      width: 8rem;
      color: ${Colors.neutral.lighter};
      border-radius: 0.25rem;
    }
  `,
  Button: styled(Button)<{ isActive: boolean }>`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
      background-color: ${(props) => (props.isActive ? '#1b4f90' : Colors.blue.base)};
    }
  `,
};

export default Toolbar;
