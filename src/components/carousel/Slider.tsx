import styled from "styled-components";
import { forwardRef, ReactNode } from "react";

interface Type {
    children: ReactNode
}

const Container = styled.div`
    width: 100vw;
    height: 60vh;
    margin: 0 -5vw;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;

    a {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    
    .previous-next-container {
        width: 100vw;
        height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        .previous-carousel {
            display: inline-block;
            width: 3rem;
            height: 100%;
            background-size: contain;
            background-image: url('http://localhost:5173/src/assets/icons/chevron-left_d.svg');
            
            &:hover {
                background-color: rgba(0, 0, 0, 0.15);
                background-image: url('http://localhost:5173/src/assets/icons/chevron-left_w.svg');
            }
        }

        .next-carousel {
            display: inline-block;
            width: 3rem;
            height: 100%;
            background-size: contain;
            float:right;
            background-image: url('http://localhost:5173/src/assets/icons/chevron-right_d.svg');

            &:hover {
                background-color: rgba(0, 0, 0, 0.15);
                background-image: url('http://localhost:5173/src/assets/icons/chevron-right_w.svg');
            }
        }
    }

    .slider-container {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(255,255,255,0.3);
        border-radius: 50px;
        padding: 0px 10px;
        vertical-align: center;

        a {
            display: inline-block;
            padding: 1rem;
            background-image: url('http://localhost:5173/src/assets/icons/dot-lined.svg');
            &:hover, &.current {
                background-image: url('http://localhost:5173/src/assets/icons/dot-filled.svg');
            }
        }
    } 
`;

const Slider = forwardRef<HTMLDivElement, Type>(({ children }, ref) => {
    return (
        <Container ref={ref}>
            {children}
        </Container>
    );
});

export { Slider };