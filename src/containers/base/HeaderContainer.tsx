import { ButtonS, IconButton } from '@components/button';
import { Flex } from '@components/div';
import { HeadLine, SubTitle } from '@components/title';
import { CategoryType } from '@config/types/ItemType';
import { NavigationContainer, SubNavagationContainer } from './NavigationContainer';

import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from "src/redux/modules";
import { CurrentSubject, HeaderIconBtn, HeaderInfoFlex, HeaderInfoWrapper, HeaderSectionTit, HeaderTop, HeaderWrapper, Subject } from '@components/base/top';
import { setHeaderHeight } from "@redux-modules/base";
import ProfileContainer from './ProfileContainer';



function HeaderContainer() {
    //== ref ==//
    const refHead = useRef<HTMLDivElement>(null);
    const refLownav = useRef<HTMLDivElement>(null);
    const refLownavArr = useRef<HTMLAnchorElement[] | null[]>([]);
    

    //== redux ==//
    const headerVisible = useSelector((state: RootState) => state.base.header.visible);
    const member = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

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
                        <HeadLine onClick={() => onClickLogo()}>COFFEE</HeadLine>
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

    /**
     * URL에 따른 네비게이션 메뉴를 보여준다.
     */
    const navMenuList = () => {
        //결제 화면 (GET /order/:itemId)
        if(params.includes("order")) {
            // return (
            //     <div style={{padding: "0.5vw 0"}}>
            //         <HeaderIconBtn className='icon left'/>
            //     </div>
            // );
            return null;
        }
        //상세 화면 (GET /:dtype/:category1/:category2/:id)
        if(params.length > 3  && !params.includes("my")) {
            return (
                <HeaderInfoWrapper>
                    <HeaderIconBtn className='icon left'/>
                    <HeaderSectionTit>
                        아이스 아메리카노
                        <SubTitle>에스프레소</SubTitle>
                    </HeaderSectionTit>
                    <HeaderInfoFlex gap={1}>
                        <IconButton className='icon heart'/>
                        <IconButton className='icon setting'/>
                    </HeaderInfoFlex>
                </HeaderInfoWrapper>
            );
        }
        //목록 화면 (GET /:dtype/:category1/*)
        if(!params.includes('') && !params.includes("my")) {
            return (
                <div>
                    <NavigationContainer categories={categories} onClick={onClickNav}/>
                    { Subnavigations() }
                </div>
            );
        }
    }

    /**
     * 네비게이션 선택 시 보여줄 하위 메뉴를 저장한다.
     */
    const onClickNav = (categoryid: number = -1) => {
        const index = categories.findIndex(c => c.id === categoryid);

        
        if(index === -1) {
            setParentid(index);
            return;
        }
        
        setParentid(categories[index].id);
    };

    /**
     * 하위 메뉴를 보여준다.
     */
    const Subnavigations = () => {
        if(parentid === -1) {
            return null;
        }
        
        const index = categories.findIndex(c => c.id === parentid);
        if(index === -1) {
            return null;
        }

        const children = categories[index].children ?? [];
        return (
            <SubNavagationContainer ref={refLownav} categories={children} onClick={onClickSubNav}/>
        );
    };

    /**
     * 현재 선택한 카테고리의 css를 변경한다.
     */
    const onClickSubNav = (index: number) => {
        const children = refLownavArr.current;

        children.map((c, i) => {
            const child = c as HTMLAnchorElement;
            
            if(child == null) return;

            const classList = child.classList ?? [];
            if(classList.contains('select')) {
                child.classList.remove('select');
            }

            if(i === index) {
                child.classList.add('select');
            }
        });
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
            { navMenuList() }
        </HeaderWrapper>
    );
}

export default HeaderContainer;