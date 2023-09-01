import { Profile, ProfileBg, RightBar, UserA, UserMenu } from "@components/base/top";
import { Anchor, IconButton } from "@components/button";
import { RootState } from "@redux-modules/index";
import { useRef } from "react";
import { useSelector } from "react-redux";


function ProfileContainer() {
    const barMenuRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const profileBackRef = useRef<HTMLDivElement>(null);

    //== redux ==//
    const { userName, userAuth } = useSelector((state: RootState) => ({
        userName: state.user.name,
        userAuth: state.user.auth
    }));

    //== function ==//
    /**
     * 하위 메뉴를 열고 닫는다.
     */
    const openUserMenu = () => {
        const barMenu = barMenuRef.current;
        if(barMenu === null || barMenu === undefined) {
            return;
        }

        if(barMenu.style.display === 'inline-block') {
            barMenu.style.display = 'none';
        } else {
            barMenu.style.display = 'inline-block';
        }
    }

    /**
     * 프로필 메뉴를 연다
     */
    const openProfile = () => {
        const profile = profileRef.current;
        if(profile === null || profile === undefined) {
            return;
        }
        
        openProfileBg();
        if(profile.style.display !== 'block') {
            profile.style.display = 'block';
        } else {
            profile.style.display = 'none';
        }
    }

    const openProfileBg = () => {
        const profileBg = profileBackRef.current;
        if(profileBg === null || profileBg === undefined) {
            return;
        }

        if(profileBg.style.display !== 'block') {
            profileBg.style.display = 'block';
        } else {
            profileBg.style.display = 'none';
        }
    }

    return (
        <Profile>
            <IconButton className="icon member" onClick={() => openProfile()}></IconButton>
            <ProfileBg ref={profileBackRef} onClick={() => openProfile()}/>
            <RightBar ref={profileRef}>
                <UserMenu>
                    <img src="http://localhost:5173/src/assets/icons/user-profile.svg" />
                    <UserA to="#" onClick={() => openUserMenu()}>{userName}</UserA>
                </UserMenu>
                {/* <UserMenu>GREEN</UserMenu> */}
                <UserMenu ref={barMenuRef}>
                    <Anchor to="#">홈</Anchor>
                    <Anchor to="#">알림</Anchor>
                    <Anchor to="#">장바구니</Anchor>
                    <Anchor to="#">히스토리</Anchor>
                    <Anchor to="#">멤버십</Anchor>
                </UserMenu>
                <UserMenu>
                    <Anchor to="/logout">로그아웃</Anchor>
                </UserMenu>
            </RightBar>
        </Profile>
    );
}

export default ProfileContainer;