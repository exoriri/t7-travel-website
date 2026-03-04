import styled from '@vue-styled-components/core';
import { VAutocomplete, VBtn, VCard } from 'vuetify/components';
import { mediaQuery } from '@/shared/styles/breakpoints';

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

  ${mediaQuery('down', 'lg')} {
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
  width: 15%;
`;

export const StyledVCard = styled(VCard)`
  padding: 10px 15px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledMenuButton = styled(VBtn)`
  width: 100%;
`;

export const StyledSearchButton = styled(VBtn)`
  height: auto !important;
  background-color: #5352ee;
  color: #fff;
`;

export const StyledLocationAutocomplete = styled(VAutocomplete)`
  width: 50%;
  max-width: 50%;
`;
