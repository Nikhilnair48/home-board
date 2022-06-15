import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spacing, BorderRadius, FontWeight } from 'shared/styles/styles';
import { Colors } from 'shared/styles/colors';
import { Box, ButtonGroup } from '@material-ui/core';
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
    const { students } = boardingData;
    const result: PartialStaffContext = {};

    if (sortOrder === 'ascending') {
      result.sortOrder = 'descending';
      result.studentsView = students.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    } else {
      result.sortOrder = 'ascending';
      result.studentsView = students.sort((a, b) => (a[key] > b[key] ? 1 : -1));
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
      <ButtonGroup
        variant="contained"
        size="small"
        aria-label="primary button group"
        disableElevation
        onClick={onColumnSelection}
      >
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

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props;
  return (
    <S.ToolbarContainer>
      <SortableHeader />
      <div>Search</div>
      <S.Button onClick={() => onItemClick('roll')}>Start Roll</S.Button>
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
    width: 5.5rem;
    align-items: center;
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
