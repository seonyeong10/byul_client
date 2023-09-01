import styled, { css } from "styled-components";
import { forwardRef, ReactNode } from "react";

interface ToggleProps {
    condition?: string,
    children: ReactNode
}

const StyledToggleBox = styled.div<ToggleProps>`
    border-bottom: none !important;
    span {
        width: 3vw;
        border: 1px solid rgba(0,0,0,0.5);
        padding: 5px 15px;
        color: rgba(0,0,0,0.5);
        cursor: pointer;

        &.on {
            background-color: rgba(0,0,0,1);
            color: #ffffff;
        }

        ${props => {
            if(props.condition === 'round') {
                return css`
                    &:first-child {
                        border-radius: 50px 0 0 50px;
                    }
                    &:last-child {
                        border-radius: 0 50px 50px 0;
                    }
                `;
            }
        }}


        &:not(:last-child) {
            border-right: none;
        }
    }
`;

const ToggleBox = forwardRef<HTMLDivElement, ToggleProps>(({ condition, children }, ref) => {
    return (
        <StyledToggleBox
            ref={ref}
            condition={condition}
        >
            {children}
        </StyledToggleBox>
    );
});

export { ToggleBox };