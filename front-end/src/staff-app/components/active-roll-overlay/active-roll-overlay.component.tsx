import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { BorderRadius, Spacing } from 'shared/styles/styles';
import { RollStateList } from 'staff-app/components/roll-state/roll-state-list.component';
import { StaffContext } from 'shared/context/staff-context';
import { ItemType, StateList } from 'staff-app/daily-care/interfaces';
import { useApi } from 'shared/hooks/use-api';

export type ActiveRollAction = 'filter' | 'exit';

export const ActiveRollOverlay: React.FC = () => {
  const [saveRoll, data, loadState] = useApi<{ students: Person[] }>({ url: 'save-roll' });
  const { boardingData, updateStore } = useContext(StaffContext);
  const { isRollMode, currentRoll, students } = boardingData;

  const generateSummary = (): StateList[] => {
    const summary: Record<ItemType, number> = {
      all: students.length,
      present: 0,
      late: 0,
      absent: 0,
    };
    currentRoll.forEach((roll) => {
      summary[roll.rollState]++;
    });
    return Object.keys(summary).map((key: string) => {
      return {
        type: key as ItemType,
        count: summary[key as ItemType],
      };
    });
  };

  const saveStudentRoll = () => {
    saveRoll({
      student_roll_states: currentRoll.map((roll) => {
        return {
          student_id: roll.studentId,
          roll_state: roll.rollState,
        };
      }),
    });
    updateStore({ isRollMode: false });
  };

  return (
    <S.Overlay isActive={isRollMode}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList stateList={generateSummary()} />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => updateStore({ isRollMode: false })}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={saveStudentRoll}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  );
};

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? '120px' : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
};
