import styled from "styled-components";
import { ReactNode } from "react";
import { forwardRef } from "react";

type ProfileType = {
    children: ReactNode
}

const ProfileWrap = styled.div`
    display: inline-block;

    button {
        vertical-align: middle;
    }

    @media screen and (max-width: 800px) {
        button {
            width: 3vw;
            height: 3vw;
        }
    }
`;

const Profile = forwardRef<HTMLDivElement, ProfileType>(({ children }, ref) => {
    return (
        <ProfileWrap ref={ref}>
            {children}
        </ProfileWrap>
    );
});

export { Profile };