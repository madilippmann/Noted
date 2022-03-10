import styled from 'styled-components';


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
    height: 50%;

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
margin-top: 25px;
display: flex;
flex-direction: row;
height: 50%;

`;

export const StickyNoteContainer = styled.div`
    width: 50%;
    height: 100%;
    //   height: 400px;
      background-color: rgb(247, 257, 137);
      border-radius: 15px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;


`;

export const StickyNote = styled.textarea`
      width: 100%;
      height: 100%;
      border: none;
      resize: none;
      background-color: transparent;
      padding: 0 10px;



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


export const TagsOuterDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 5px;
`;


export const TagContainer = styled.div`
    border-radius: 25px;
    font-size: 10px;
    background-color: rgb(240, 240, 240);
    padding: 3px 10px;
    margin-right: 5px;
    margin-top: 5px;

`;
