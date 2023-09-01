import { DDA } from "@components/button";
import colors from "src/styles/Colors";
import styled from "styled-components";
import { forwardRef, ReactNode } from "react";

interface RightBarType {
    children: ReactNode
}

const StyledRightBar = styled.div`
    display: none;
    position: absolute;
    top: calc(24px + 2vw);
    right: -1vw;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 5px;
    background-color: #fff;
    width: 15vw;
    overflow: hidden;

    @media(max-width: 800px) {
        top: 0;
        right: -5vw;
        height: 100vh;
        width: 40%;
        border-radius: 0;
        box-shadow: none;

        animation: slide 0.4s ease;
    }
    
    @keyframes slide {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
`;

const UserA = styled(DDA)`
    display: inline-block !important;
    width: calc(100% - 4vw - 24px) !important;
    padding: 0.5vw 1vw !important; 
    margin: 0 1vw 0 0;
    background-position: right center !important;
    background-size: 24px;
    border: none;
    vertical-align: middle;

    &:hover {
        background-color: #fff !important;
    }

    @media(max-width: 800px) {
        padding: 0vw 2vw !important;
        width: calc(100% - 7vw - 24px) !important;
    }
`;

const StyledUserMenu = styled.div`
    display: inline-block;
    width: calc(100%);
    padding: 0.5vw 0;
    background-color: #fff;
    

    &:not(:last-child) {
        border-bottom: 1px solid ${colors.black.light};
    }

    &:first-child {
        position: relative;
        z-index: 1;
    }

    // &:nth-of-type(2) {
    //     background-color: rgba(0,0,0,0.5);
    //     color: #fff;
    //     padding: 0.5vw 1vw;
    // }

    img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-left: 1vw;
    }

    a {
        display: inline-block;
        width: calc(100% - 2vw);
        background-position: left top;
        padding: 0.5vw 1vw;
        &:hover {
            background-color: rgba(0,0,0,0.05);
        }
    }

    @keyframes dropdown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    animation: dropdown 0.4s ease;

    @media(max-width: 800px) {
        padding: 2vw 0;

        &:nth-of-type(2) {
            padding: 2vw;
        }

        img {
            margin-left: 2vw;
        }

        a {
            padding: 1vw 2vw;
        }

        animation: none;
    }
`;

//== component ==//
const RightBar = forwardRef<HTMLDivElement, RightBarType>(({ children }, ref) => {
    return(
        <StyledRightBar ref={ref}>
            {children}
        </StyledRightBar>
    );
});

const UserMenu = forwardRef<HTMLDivElement, RightBarType>(({ children }, ref) => {
    return(
        <StyledUserMenu ref={ref}>
            {children}
        </StyledUserMenu>
    );
});

export { RightBar, UserA, UserMenu };