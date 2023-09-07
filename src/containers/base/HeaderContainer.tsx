import { ButtonS } from '@components/button';
import { Flex } from '@components/div';
import { HeadLine } from '@components/title';
import { CurrentSubject, HeaderTop, HeaderWrapper, Subject } from '@components/base/top';
import { CategoryType } from '@config/types/ItemType';

import ProfileContainer from './ProfileContainer';

import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from "src/redux/modules";
import { setHeaderHeight } from "@redux-modules/base";
import SubHeaderContainer from './header/SubHeaderContainer';
import InfoHeaderContainer from './header/InfoHeaderContainer';



function HeaderContainer() {
    //== ref ==//
    const refHead = useRef<HTMLDivElement>(null);
    

    //== redux ==//
    const dispatch = useDispatch();
    const headerVisible = useSelector((state: RootState) => state.base.header.visible);
    const member = useSelector((state: RootState) => state.user);

    //== state ==//
    const [parentid, setParentid] = useState(-1);
    const navigate = useNavigate();

    //== variables ==//
    const location = useLocation();
    const params = location.pathname.substring(1).split("/");

    const categories: Array<CategoryType> = [ //테스트 데이터
        { id:1, name: '음료', engName: 'drink', children: [
            { id:4, name: '에스프레소', engName: 'esspresso', children: [] },
            { id:5, name: '콜드브루', engName: 'coldbrew', children: [] },
            { id:6, name: '디카페인', engName: 'decaffeine', children: [] },
        ] },
        { id:2, name: '푸드', engName: 'food', children: [] },
        { id:3, name: '상품', engName: 'goods', children: [] },
    ];

    useEffect(() => {
        dispatch(setHeaderHeight({ height: (refHead.current?.offsetHeight ?? 0) + 32 }));

        if(params.length < 2) {
            setParentid(-1);
            return;
        }

        const ctgIndex = categories.findIndex(ctg => ctg.engName === params[1]);
        if(ctgIndex === -1) {
            return;
        }
        setParentid(categories[ctgIndex].id);

    }, [location.key, parentid]);


    //== function ==//

    /*
     * 홈 화면으로 이동한다.
     */
    const onClickLogo = () => {
        // window.location.replace('/');
        navigate("/");
    }

    /**
     * 로그인 페이지로 이동한다.
     */
    const goLoginPage = () => {
        window.location.href = '/login';
    }

    if (!headerVisible) {
        return (
            <HeaderWrapper ref={refHead}>
                <HeaderTop>
                    <Flex>
                        <HeadLine onClick={() => onClickLogo()}>LOGO</HeadLine>
                    </Flex>
                    <ButtonS type="button" onClick={() => goLoginPage()}>로그인</ButtonS>
                </HeaderTop>
            </HeaderWrapper>
        );
    }

    /**
     * Header 최상단 메뉴를 보여준다.
     * @returns 
     */
    const LogoMenu = () => {
        switch(true) {
            case (params.includes('menus')): 
                return (
                    <CurrentSubject to={"/menus"}>메뉴</CurrentSubject>
                );
            default: 
                return (
                    <>
                        <Subject to={"/"}>홈</Subject>
                        <Subject to={"/menus"}>메뉴</Subject> 
                    </>
                );
        }
    };

    return (
        <HeaderWrapper ref={refHead}>
            <HeaderTop>
                <Flex>
                    <HeadLine onClick={() => onClickLogo()}>COFFEE</HeadLine>
                    { LogoMenu() }
                </Flex>
                
                {
                    member.id < 0 ?
                    <ButtonS type="button" onClick={() => goLoginPage()}>로그인</ButtonS>
                    : <ProfileContainer />
                }
            </HeaderTop>
            <SubHeaderContainer />
            <InfoHeaderContainer />
        </HeaderWrapper>
    );
}

export default HeaderContainer;