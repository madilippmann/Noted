import styled, { keyframes } from 'styled-components';

export const SlideRight = keyframes`
0% {
    transform: translateX(-500px);
    opacity: 0;
}
50% {
    opacity: 0;
}
75% {
    opacity: .25;
}

90% {
    opacity: .5;
}
100% {
    transform: translateX(0);
    opacity: 1;
}
`;


export const SlideLeft = keyframes`
0% {
    transform: translateX(500px);
    opacity: 0;

}
50% {
    opacity: 0;
}
75% {
    opacity: .25;
}

90% {
    opacity: .5;
}
100% {
    transform: translateX(0);
    opacity 1;

}
`;

export const SlideDown = keyframes`
0% {
    transform: translateY(-250px);
    opacity: 0;
}
50% {
    opacity: 0;
}
75% {
    opacity: .25;
}

90% {
    opacity: .5;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`;

export const SlideUp = keyframes`
0% {
    transform: translateY(200px);
    opacity: 0;

}
50% {
    opacity: 0;
}
75% {
    opacity: .25;
}

90% {
    opacity: .5;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`;
