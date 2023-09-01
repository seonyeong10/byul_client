import styled from "styled-components";
import { forwardRef, ReactNode } from "react";
import colors from "src/styles/Colors";

type Type = {
    children: ReactNode
}

const Wrapper = styled.div<Type>`
    width: 100vw; height: 100vh;
    margin: 0 -5vw 0;
    position: absolute;
    top: 0;
    background: ${colors.black.light};

    input[type='date'] {
        padding: 5px 15px;
        border: none;
        font-size: 17px;
        font-weight: bold;

        &:focus {
            outline: none;
        }
    }

    label {
        cursor: pointer;
    }
`;

const PopupWrapper = forwardRef<HTMLDivElement, Type>(({ children }, ref ) => {
    return (
        <Wrapper ref={ref}>
            {children}
        </Wrapper>
    );
});

export { PopupWrapper };