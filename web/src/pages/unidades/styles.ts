import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.colors.background};
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'unidades localColeta cadastro'
      'unidades localColeta cadastro'
      'unidades localColeta cadastro';
    width: 100vw;
    flex: 1;
    row-gap: 1rem;
    padding: 1rem;
    column-gap: 1rem;
    .localColeta {
      grid-area: localColeta;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-radius: 8px;
      background: ${(props) => props.theme.colors.foreground};
      box-shadow: 0px 0px 15px #00000030;
      flex: 1;
      padding: 5px 20px;
      transition: all 0.5s ease-in-out;
      z-index: 100;
    }
    .unidades {
      grid-area: unidades;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-radius: 8px;
      background: ${(props) => props.theme.colors.foreground};
      box-shadow: 0px 0px 15px #00000030;
      width: 100%;
      padding: 5px 20px;
      transition: all 0.5s ease-in-out;
      z-index: 100;
    }

    .cadastro {
      grid-area: cadastro;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-radius: 8px;
      background: ${(props) => props.theme.colors.foreground};
      box-shadow: 0px 0px 15px #00000030;
      width: 100%;
      padding: 5px 20px;
      transition: all 0.5s ease-in-out;
      z-index: 100;

      select {
        width: 100%;
        height: 40px;
        padding: 0.5rem;
        border: 0;
        border-radius: 0.5rem;
        background-color: ${(props) => props.theme.colors.foreground};
        color: ${(props) => props.theme.colors.text};
        font-size: 1.4rem;
        font-weight: 500;
        box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.shadow};
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
          background-color: ${(props) => props.theme.colors.foreground};
          color: ${(props) => props.theme.colors.text};
          font-size: 1.4rem;
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
  }
`;
