import styled from 'styled-components'

export const Button = styled.button`
padding: 5px 10px;
border-radius: 25px;
color: #F3F3F3;
background-color: rgb(124, 0, 249);
border: 2px solid rgb(124, 0, 249);
transition: background-color .24s ease, color .24s ease;
margin-left: 10px;

&:hover {
    color: ${props => props.buttonColor || 'rgb(124, 0, 249)'};
    background-color: #F3F3F3;
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
