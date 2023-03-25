import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.colors.background};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.foreground};
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.shadow};

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.title};
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 1rem 0;
      gap: 2rem;

      input {
        width: 100%;
        height: 40px;
        padding: 0.5rem;
        border: 0;
        border-radius: 0.5rem;
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
        font-size: 1rem;
        font-weight: 500;
        box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.shadow};
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        width: 100%;
        gap: 1rem;
        box-shadow: none;
        padding: 0;
        margin-top: 1rem;
        button {
          width: 100%;
          height: 40px;
          padding: 0.5rem;
          border: 0;
          border-radius: 0.5rem;
          background-color: ${(props) => props.theme.colors.primary};
          color: ${(props) => props.theme.colors.foreground};
          font-size: 1.2rem;
          font-weight: 600;
          box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.shadow};
        }
      }
    }
  }
`;
