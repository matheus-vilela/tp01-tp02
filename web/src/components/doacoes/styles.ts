import { LinkProps } from 'react-router-dom';
import styled from 'styled-components';

type Props = LinkProps & {
  active: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.foreground};
  box-shadow: 0px 0px 15px #00000030;
  width: 100%;
  padding: 5px 20px;
  transition: all 0.5s ease-in-out;
  z-index: 100;
  overflow-y: scroll;
  h1 {
    width: 100%;
    text-align: left;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid ${(props) => props.theme.colors.text};

    div {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      h1 {
        font-size: 1.2rem;
        font-weight: 800;
        color: ${(props) => props.theme.colors.black};
      }

      h2 {
        font-size: 1.4rem;
        font-weight: 400;
        color: ${(props) => props.theme.colors.text};
      }
    }
  }
`;
