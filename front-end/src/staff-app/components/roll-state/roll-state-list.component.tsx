import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RollStateIcon } from 'staff-app/components/roll-state/roll-state-icon.component';
import { Spacing, FontWeight } from 'shared/styles/styles';
import { RollStateType } from 'shared/models/roll';
import { StaffContext } from 'shared/context/staff-context';
import { Person } from 'shared/models/person';

interface Props {
  stateList: StateList[];
  onItemClick?: (type: ItemType) => void;
  size?: number;
}
export const RollStateList: React.FC<Props> = ({ stateList, size = 14, onItemClick }) => {
  const { boardingData, updateStore } = useContext(StaffContext);
  const { students, currentRoll } = boardingData;

  const onClick = (type: ItemType) => {
    if (type === 'all') {
      return updateStore({ studentsView: students });
    } else {
      const rollsMatchingState = currentRoll.filter((roll) => roll.rollState === type);
      const filterStudents: Person[] = [];
      for (let i = 0; i < rollsMatchingState.length; i++) {
        const existingStudentIndex = students.findIndex((student) => rollsMatchingState[i].studentId === student.id);
        if (existingStudentIndex > -1) filterStudents.push(students[existingStudentIndex]);
      }
      updateStore({ studentsView: filterStudents });
    }
  };

  return (
    <S.ListContainer>
      {stateList.map((s, i) => {
        if (s.type === 'all') {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon icon="users" size="sm" style={{ cursor: 'pointer' }} onClick={() => onClick(s.type)} />
              <span>{s.count}</span>
            </S.ListItem>
          );
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon type={s.type} size={size} onClick={() => onClick(s.type)} />
            <span>{s.count}</span>
          </S.ListItem>
        );
      })}
    </S.ListContainer>
  );
};

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
};

interface StateList {
  type: ItemType;
  count: number;
}

type ItemType = RollStateType | 'all';
