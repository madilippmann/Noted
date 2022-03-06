import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';


export default function Slide({ children, direction = 'up', duration = .5, onVisibilityChange }) {
    const slideRight = keyframes`
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


    const slideLeft = keyframes`
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

    const slideDown = keyframes`
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

    const slideUp = keyframes`
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


    // Here we create a component that will rotate everything we pass in over two seconds
    let slideDirection;
    if (direction === 'right') {
        slideDirection = slideRight
    } else if (direction === 'left') {
        slideDirection = slideLeft
    } else if (direction === 'up') {
        slideDirection = slideUp
    } else if (direction === 'down') {
        slideDirection = slideDown
    }


    const SlideAnimation = styled.div`
        animation: ${slideDirection} ${duration}s ease;
    `;


    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        const load = setTimeout(() => {
            setInitialRender(false)
        }, duration * 1000)
        return () => clearTimeout(load)
    }, [])

    return (
        <>
            {
                initialRender ?
                    <SlideAnimation>
                        {children}
                    </SlideAnimation > :
                    <div>
                        {children}
                    </div>
            }
        </>
    );
}