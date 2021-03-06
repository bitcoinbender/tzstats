import React from 'react';
import styled from 'styled-components';
import Popover from '../../Common/Popover';
import { DataBox } from '../../Common';

const ProgressBar = ({ settings }) => {
  return settings.map((item, i) => {
    return (
      <Wrapper key={i}>
        <ProgressBarEmpty {...item} />
        <Popover
          content={
            <DataBox
              valueType="currency"
              valueOpts={{digits:0,round:1}}
              valueSize="14px"
              value={item.value}
              title={`${item.id} ${item.percent < 1 ? '< 1' : item.percent}%`}
            />
          }
          placement="top"
        >
          <ProgressBarItems {...item} />
        </Popover>
      </Wrapper>
    );
  });
};

const VerticalProgressBar = ({ settings }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBar settings={settings} />
    </ProgressBarWrapper>
  );
};
const ProgressBarWrapper = styled.div`
  border-radius: 2px;
  width: 100%;
  height: 120px;

  background: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ProgressBarItems = styled.div`
  background: ${prop => prop.color};
  height: ${prop => (prop.size < 1 ? 1 : prop.size)}%;
  border-right: 1px solid #424552;
  min-width: 40px;
  border-radius: 2px;
`;

const ProgressBarEmpty = styled.div`
  height: ${prop => 100 - prop.size}%;
  min-width: 40px;
  border-radius: 2px;
`;
const Wrapper = styled.div`

}
`;
export default VerticalProgressBar;
