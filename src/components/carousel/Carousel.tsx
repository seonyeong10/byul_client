import styled from "styled-components";

import { forwardRef, ReactNode } from "react";

interface Type {
    children: ReactNode
}

const Container = styled.div`
    overflow: hidden;
    margin: -2vw -5vw 0;

    div.container {
        width: 300vw;
        height: 60vh;
        transition: transform 0.5s; //transform이 변경될 때 서서히 변경하기
    }

    div.inner {
        width: 100vw;
        height: 100%;
        float: left;
        
        img {
            width: 100%;
        }
    }
`;

const Carousel = forwardRef<HTMLDivElement, Type>(({children}, ref) => {
    return (
        <Container>
            {children}
        </Container>
    )
});

export { Carousel };