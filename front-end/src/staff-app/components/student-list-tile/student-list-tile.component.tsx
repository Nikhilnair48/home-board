import React, { useContext } from 'react';
import styled from 'styled-components';
import { Spacing, BorderRadius, FontWeight } from 'shared/styles/styles';
import { Images } from 'assets/images';
import { Colors } from 'shared/styles/colors';
import { Person, PersonHelper } from 'shared/models/person';
import { RollStateSwitcher } from 'staff-app/components/roll-state/roll-state-switcher.component';
import { StaffContext } from 'shared/context/staff-context';
import { RollStateType } from 'shared/models/roll';
import { RollInfo } from 'staff-app/daily-care/interfaces';

interface Props {
  student: Person;
}
export const StudentListTile: React.FC<Props> = ({ student }) => {
  const { boardingData, updateStore } = useContext(StaffContext);
  const { currentRoll, isRollMode } = boardingData;

  const updateStudentState = (rollState: RollStateType) => {
    const existingIndex = currentRoll.findIndex((roll) => roll.studentId === student.id);
    const updatedRoll: RollInfo = { studentId: student.id, rollState: rollState };
    if (existingIndex > -1) currentRoll.splice(existingIndex, 1, updatedRoll);
    else currentRoll.push(updatedRoll);

    updateStore({
      currentRoll,
    });
  };

  const getSwitcherState = () => {
    const index = currentRoll.findIndex((roll) => roll.studentId === student.id);
    if (index > -1) {
      return currentRoll[index].rollState;
    }
    return 'unmark';
  };

  return (
    <S.Container>
      <S.Avatar url={Images.avatar}></S.Avatar>
      <S.Content>
        <div>{PersonHelper.getFullName(student)}</div>
      </S.Content>
      {isRollMode && (
        <S.Roll>
          <RollStateSwitcher initialState={getSwitcherState()} onStateChange={updateStudentState} />
        </S.Roll>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: flex;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Avatar: styled.div<{ url: string }>`
    width: 60px;
    background-image: url(${({ url }) => url});
    border-top-left-radius: ${BorderRadius.default};
    border-bottom-left-radius: ${BorderRadius.default};
    background-size: cover;
    background-position: 50%;
    align-self: stretch;
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Roll: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u4};
  `,
};
