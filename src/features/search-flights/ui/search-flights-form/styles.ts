import styled from '@vue-styled-components/core';
import { VCard } from 'vuetify/components';

export const StyledSearchBox = styled.div`
  border-radius: 20px;
  background-color: #fff;
  width: 90%;
`;

export const StyledCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;

  @media (max-width: 1201px) {
    flex-direction: column;
  }
`;

export const StyledDirectionsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 40%;
`;

export const StyledCalendarContainer = styled.div`
  display: flex;
  width: 30%;
`;

export const StyledPassangersContainer = styled.div`
  width: 20%;
`;

export const StyledVCard = styled(VCard)`
  padding: 10px 15px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
