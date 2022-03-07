import styled from 'styled-components'

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

    `;

export const ButtonDiv2 = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;


export const ModalButton = styled.button`
        font-size: 16px;
        padding: 5px;
        color: white;


        padding: 5px 10px;
        border-radius: 25px;
        color: #F3F3F3;
        background-color: rgb(64, 0, 189);
        transition: background-color .24s ease;
        margin-left: 10px;

        &:hover {
            background-color: ${props => props.buttonColor};
        }
    `;



export const ModalDiv = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    `;



export const TitleInput = styled.input`
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 0px;
    border: none;
    margin-bottom: 10px;
`;

export const ContentTextarea = styled.textarea`
    width: 100%;
    height: 100%;
    flex-grow: 2;
    padding: 10px;
    border: none;
    resize: none;

`;

export const Button = styled.button`
    padding: 5px 10px;
    border-radius: 25px;
    color: #F3F3F3;
    background-color: rgb(124, 0, 249);
    border: 2px solid rgb(124, 0, 249);
    transition: background-color .24s ease, color .24s ease;
    margin-left: 10px;

    &:hover {
        color: ${props => props.buttonColor};
        background-color: #F3F3F3;
        border: 2px solid ${props => props.buttonColor};
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

export const TitleError = styled.p`
    color: red;
    margin: 0;
    align-self: flex-start;
    font-size: 12px;

`;

export const CenteringDiv = styled.div`
display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const JustifyTopDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;



export const Form = styled.form`
    margin: auto;
    width: 100%;
    height: 100%;
    padding: 50px;
    padding-top: 35px;
`;


export const ClickableIcon = styled.button`
    padding-bottom: 10px;
    transition: color .25s ease;
    &:hover {
        color: rgb(124, 0, 249);
    }
`;
