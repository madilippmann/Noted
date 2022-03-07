import styled from 'styled-components'

export const CenteringDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;



export const Backdrop = styled.div`
    background-color: rgba(255, 255, 255, .85);
    border-radius: 15px;
    padding: 10px;

`;

export const NotesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;

    &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 25px;
      }
`;


export const NotebooksContainer = styled.div`
`;

export const H1 = styled.h1`
    margin: 20px 20px 0 30px;
`;
