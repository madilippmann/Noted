import { useState, useEffect } from 'react';

import * as StyledComponents from '../StyledComponents.js'
import styled from 'styled-components';

export default function Slide({ children, direction = 'up', duration = .5, onVisibilityChange }) {

    // Here we create a component that will rotate everything we pass in over two seconds
    let slideDirection;
    if (direction === 'right') {
        slideDirection = StyledComponents.SlideRight
    } else if (direction === 'left') {
        slideDirection = StyledComponents.SlideLeft
    } else if (direction === 'up') {
        slideDirection = StyledComponents.SlideUp
    } else if (direction === 'down') {
        slideDirection = StyledComponents.SlideDown
    }


    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        const load = setTimeout(() => {
            setInitialRender(false)
        }, duration * 1000)
        return () => clearTimeout(load)
    }, [])

    const SlideAnimation = styled.div`
    animation: ${slideDirection} ${duration}s ease;
    `;


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
