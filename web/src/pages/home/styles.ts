import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  .content {
    display: grid;
    width: 100vw;
    max-height: 100vh;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'estoque unidades pessoas'
      'estoque doacoes pessoas'
      'estoque doacoes pessoas';
    row-gap: 1rem;
    padding: 1rem;
    column-gap: 1rem;
    .estoque {
      grid-area: estoque;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-radius: 8px;
      background: ${(props) => props.theme.colors.foreground};
      box-shadow: 0px 0px 15px #00000030;
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

    .doacoes {
      grid-area: doacoes;
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

    .pessoas {
      grid-area: pessoas;
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
  }
`;
