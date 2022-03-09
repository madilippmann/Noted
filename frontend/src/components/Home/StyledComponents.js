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




export const H1 = styled.h1`
    margin: 20px 20px 0 30px;
`;


export const NotebooksContainer = styled.div`
background-color: rgba(255, 255, 255, .85);
border-radius: 15px;
padding: 10px;
margin-right: 50px;
width: calc(100% - 450px);
height: 100%;
`;


export const BottomDiv = styled.div`
margin-top: 50px;
display: flex;
flex-direction: row;
`;

export const StickyNoteContainer = styled.div`
      width: 400px;
      height: 400px;
      background-color: yellow;
      border-radius: 15px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
`;

export const StickyNote = styled.textarea`
      width: 350px;
      height: 300px;
      border: none;
      background-color: transparent;
    //   padding: 20px;



      &:focus {
        outline: none;
    }

    // &:target {
    //     border: 1px solid white;
    // }
`;


export const ScratchPadTitle = styled.h2`
    font-size: 16px;
    align-self: flex-start;
    margin-left: 10px;
`;
