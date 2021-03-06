import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spacing, BorderRadius, FontWeight } from 'shared/styles/styles';
import { Colors } from 'shared/styles/colors';
import { CenteredContainer } from 'shared/components/centered-container/centered-container.component';
import { Person } from 'shared/models/person';
import { useApi } from 'shared/hooks/use-api';
import { StudentListTile } from 'staff-app/components/student-list-tile/student-list-tile.component';
import { ActiveRollOverlay } from 'staff-app/components/active-roll-overlay/active-roll-overlay.component';
import Toolbar from './tool-bar';
import { StaffContext } from 'shared/context/staff-context';

export const HomeBoardPage: React.FC = () => {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: 'get-homeboard-students' });
  const { boardingData, updateStore } = useContext(StaffContext);
  const { studentsView } = boardingData;

  useEffect(() => {
    void getStudents();
  }, [getStudents]);

  useEffect(() => {
    if (data && data.students && boardingData.studentsView.length === 0) {
      updateStore({
        students: data.students,
        studentsView: data.students.sort((a, b) => (a.first_name > b.first_name ? 1 : -1)),
      });
    }
  }, [data, updateStore, boardingData]);

  return (
    <>
      <S.PageContainer>
        <Toolbar />

        {loadState === 'loading' && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === 'loaded' && studentsView && (
          <>
            {studentsView.map((s) => (
              <StudentListTile key={s.id} student={s} />
            ))}
          </>
        )}

        {loadState === 'error' && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay />
    </>
  );
};

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
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
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
};
