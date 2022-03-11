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
    font-size: 24px;
    justify-content: center;
    border-radius: 0px;
    border: none;
    margin-bottom: 0;
    margin-bottom: 10px;
    &:focus {
        outline: none;
    }
`;

export const ContentTextarea = styled.textarea`
    width: 100%;
    height: 100%;
    flex-grow: 2;
    padding: 10px;
    border: none;
    resize: none;

    &:focus {
        outline: none;
    }

`;


export const TextEditorContainer = styled.div`
    width: 100%;
    background-color: white;
    height: 100%;
    // display: flex;
    // flex-direction: column;

`;



export const TagsOuterContainer = styled.div`
        // height: 50px;
        width: 100%;
        background-color: white;
        display: flex;
        border-top: rgb(245, 245, 245);
        padding: 10px 15px;

`;

export const TagsContainer = styled.div`
        // height: 50px;
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

`;
export const TagsCreate = styled.div`
        height: 50px;
        background-color: white;
        display: flex;
        justify-content: flex-end;
        align-items:center;
`;

export const OuterInput = styled.div`
`;

export const TagInput = styled.input`
    border: none;
    width: min-content;
    height: 10px;
    background-color: transparent;
    padding; 0;
    cursor: pointer;

    &:focus {
        outline: none;
    }


`;

export const InputDiv = styled.div`
    display:flex;
    height: fit-content;
    border-radius: 25px;
    background-color: rgb(245, 245, 245);
    margin: 0 3px;
    transition: background-color .24s ease;
    &:hover {
        background-color: rgb(235, 235, 235)
    }
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


export const DeleteTagButton = styled.button`

    display:flex;
    align-self: center;
    padding-right: 5px;


    &:hover {
    color: rgb(250, 76, 76);
    }


`;
