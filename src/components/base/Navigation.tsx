import styled from 'styled-components';
import { ReactNode, forwardRef } from 'react';

//== type ==//
interface NavProps {
    condition?: string, // sub
    children: ReactNode
}

//== style ==//
const StyledNavigation = styled.nav<NavProps>`
    padding: 1rem 0;
    border-bottom: 1px solid #eee;

    a {
        text-decoration: none;
        padding: ${props => props.condition === "sub" ? '3px 9px' : '1rem 0'};
        font-size: ${props => props.condition === "sub" ? '14px' : '18px'};
        font-weight: ${props => props.condition === "sub" ? '500' : '700'};
        cursor: pointer;

        &:not(:first-child) {
            margin-left: 0.5vw;
        }

        &:hover {
            color: rgba(0,0,0,1);
        }
    }

    &:first-child {
        a:not(:first-child) {
            margin-left: 2vw;
        }
    }
`;

//== component ==//
const Navigation = forwardRef<HTMLDivElement, NavProps>(({ condition = "", children }, ref) => {
    return (
        <StyledNavigation 
            ref={ref}
            condition={condition}
            className={condition === "" ? "header-delimiter" : ""}>
            {children}
        </StyledNavigation>
    );
});

export { Navigation }