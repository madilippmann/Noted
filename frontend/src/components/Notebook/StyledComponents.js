import styled from 'styled-components';


export const MainDiv = styled.div`
    height: 95%;
    width: 95%;
    padding: 25px 50px;

    border-radius: 10px;
    background-color: rgba(255, 255, 255, .85);

    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(255, 255, 255);
        border-radius: 25px;
      }



`;

export const UpperDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 0 15px 0;
    margin-bottom: 25px;
`;


export const Button = styled.button`
padding: 5px 10px;
border-radius: 25px;
color: #F3F3F3;
background-color: rgb(124, 0, 249);
border: 2px solid rgb(124, 0, 249);
transition: background-color .24s ease, border .24s ease;
margin-left: 10px;

&:hover {
    background-color: ${props => props.buttonColor || 'rgb(124, 0, 249)'};
    border: 2px solid ${props => props.buttonColor || 'rgb(124, 0, 249)'};
}
&:disabled {
    opacity: 50%;
}

&:disabled:hover {
    color: #F3F3F3;
    background-color: rgb(124, 0, 249);
    border: 2px solid rgb(124, 0, 249);
    cursor: not-allowed;
}
`;


export const TableRow = styled.tr`
    background-color: transparent;
    border-radius: 15px;
    transition: background-color .15s ease;


    &:hover {
        background-color: rgba(112, 0, 248, .35);
    }
`;



// MODAL


export const Modal = styled.div`
        position: absolute;
        z-index: 2000;
        display: flex;
        width: 400px;
        height: 200px;
        margin: 0;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;

    `

export const ModalInfo = styled.div`
        flex-grow: 1;
        display: flex;
        align-self:center;
        flex-direction: column;
        align-items:center;
    `

export const ButtonDiv = styled.div`
        display: flex;
        justify-content: space-between;
        flex-direction: column;

    `;

export const InputDiv = styled.div`
    display: flex;
    padding: 10px 0;
`;


export const ButtonDiv2 = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;


export const ModalButton = styled.button`
        // font-size: 12px;
        padding: 5px;
        color: white;


        padding: 5px 10px;
        border-radius: 25px;
        color: #F3F3F3;
        background-color: rgb(64, 0, 189);
        transition: background-color .24s ease;
        margin-left: 10px;
        // border: 2px solid rgba(233, 233, 233, .2);

        &:hover {
            background-color: ${props => props.buttonColor};
        }
    `;



export const ModalDiv = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    `;


export const Table = styled.div`
`;
