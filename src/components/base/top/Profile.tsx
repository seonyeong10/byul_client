import styled from "styled-components";
import { ReactNode } from "react";
import colors from "src/styles/Colors";
import { forwardRef } from "react";

type ProfileType = {
    children: ReactNode
}

type BackgroundType = {
    onClick?: () => void
}

const ProfileWrap = styled.div`
    display: inline-block;

    button {
        vertical-align: middle;
    }

    @media(max-width: 800px) {
        button {
            width: 3vw;
            height: 3vw;
        }
        
    }

`;

const Background = styled.div`
    display: none;
    cursor: pointer;

    @media(max-width: 800px) {
        background-color: ${colors.black.regular};
        position: absolute;
        top: 0; 
        left: -5vw;
        width: 100vw;
        height: 100vh;
    }

`;

const Profile = forwardRef<HTMLDivElement, ProfileType>(({ children }, ref) => {
    return (
        <ProfileWrap ref={ref}>
            {children}
        </ProfileWrap>
    );
});

const ProfileBg = forwardRef<HTMLDivElement, BackgroundType>(({ onClick }, ref) => {
    return <Background ref={ref} onClick={onClick}/>;
});

export { Profile, ProfileBg };