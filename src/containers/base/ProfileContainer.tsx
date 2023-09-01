import { Profile } from "@components/base/top";
import { Anchor, IconButton } from "@components/button";
import { RootState } from "@redux-modules/index";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MyModal } from "@components/popup/ProfileModalWrapper";
import { ModalMenu } from "@components/popup";
import { Link } from "react-router-dom";


function ProfileContainer() {
    const barMenuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    //== redux ==//
    const { userId, userName, userAuth } = useSelector((state: RootState) => ({
        userName: state.user.name,
        userId : state.user.id,
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

        if(barMenu.style.display === 'block') {
            barMenu.style.display = 'none';
        } else {
            barMenu.style.display = 'block';
        }
    }
    
    //== react-modal 적용 ==//
    const handleModal = () => {
        //사용자 메뉴 모달을 연다.
        setOpen(!isOpen);
    };

    return (
        <Profile>
            <IconButton className="icon member" onClick={() => handleModal()}></IconButton>
            <MyModal isOpen={isOpen} closeModal={handleModal}>
                <ModalMenu>
                    <img src="http://localhost:5173/src/assets/icons/user-profile.svg" />
                    {userName}
                    <Link className="drop" to="#" onClick={() => openUserMenu()}>{userName}</Link>
                </ModalMenu>
                <ModalMenu ref={barMenuRef}>
                    <Anchor to="/">홈</Anchor>
                    <Anchor to={`/my/${userId}/cart`}>장바구니</Anchor>
                    <Anchor to={`/my/${userId}/history`}>히스토리</Anchor>
                </ModalMenu>
                <ModalMenu>
                    <Anchor to="/logout">로그아웃</Anchor>
                </ModalMenu>
            </MyModal>
        </Profile>
    );
}

export default ProfileContainer;