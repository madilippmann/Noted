import styled from 'styled-components';


export const MainDiv = styled.div`
    height: 95%;
    width: 95%;
    padding: 23px 50px;

    border-radius: 10px;
    background-color: rgba(255, 255, 255, .75);
`;

export const UpperDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 0 15px 0;

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
