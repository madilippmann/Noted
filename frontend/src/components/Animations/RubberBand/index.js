import styled, { keyframes } from 'styled-components'
import { useState, useEffect } from 'react';

export default function RubberBand({ children }) {
    const animation = keyframes`
        from {
            transform: scale3d(1, 1, 1);
        }

        25% {
            transform: scale3d(1.25, 0.75, 1);
        }

        40% {
            transform: scale3d(0.75, 1.25, 1);
        }

        50% {
            transform: scale3d(1.20, 0.90, 1);
        }

        65% {
            transform: scale3d(.95, 1.10, 1);
        }

        80% {
            transform: scale3d(1.10, .90, 1);
        }

        to {
            transform: scale3d(1, 1, 1);
        }
    `;


    const RubberBandAnimation = styled.div`
        display: inline-block;
        animation: ${animation} 1.5s ease;
    `;

    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        console.log("BEFORE: ", initialRender);
        const load = setTimeout(() => {
            setInitialRender(false)
        }, 1500)
        return () => clearTimeout(load)
    }, [])


    return (
        <>
            {initialRender ?
                <RubberBandAnimation>
                    {children}
                </RubberBandAnimation> :
                <div>
                    {children}
                </div>}
        </>
    );
}
