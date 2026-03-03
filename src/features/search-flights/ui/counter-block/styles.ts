import styled from '@vue-styled-components/core';
import { VBtn } from 'vuetify/components';

const COUNTER_BTN_SIZE = 50;

export const StyledContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

export const StyledBtn = styled(VBtn)`
  background-color: #5352ee;
  max-width: ${COUNTER_BTN_SIZE}px;
  min-width: ${COUNTER_BTN_SIZE}px;
  max-height: ${COUNTER_BTN_SIZE}px;
  min-height: ${COUNTER_BTN_SIZE}px;
  border-radius: 10px;
`;

export const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;
