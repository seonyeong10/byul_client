import { ReactNode, forwardRef } from "react";
import styled from "styled-components";

//== type ==//
type HeaderType = {
    children?: ReactNode
}

//== style ==//
const Header = styled.div<HeaderType>`
    background-color: #fff;

    width: 90vw; //body: padding: 0 5vw
    padding-top: 1vw;

    //position: fixed;
    position: sticky;
`;

//== component ==//
const HeaderWrapper = forwardRef<HTMLDivElement, HeaderType>(({ children }, ref) => {
    return (
        <Header ref={ref} id="header">
            {children}
        </Header>
    );
})

export { HeaderWrapper };