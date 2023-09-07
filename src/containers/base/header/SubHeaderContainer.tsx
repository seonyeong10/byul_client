import { useLocation } from "react-router-dom";
import { NavigationContainer, SubNavagationContainer } from "../NavigationContainer";
import { CategoryType } from "@config/types/ItemType";
import { useRef, useState } from "react";

/**
 * 하위 메뉴 보여주기
 */
function SubHeaderContainer() {
    const location = useLocation();
    const paths = location.pathname.substring(1).split("/");

    if (paths.includes("order") || paths.includes("my")) {
        return null;
    }

    if (paths.length > 3) {
        return null;
    }

    //== refs ==//
    const refLowNav = useRef<HTMLDivElement>(null);
    const refLownavArr = useRef<HTMLAnchorElement[] | null[]>([]);


    //== variables ==//
    const categories: Array<CategoryType> = [ //테스트 데이터
        { id:1, name: '음료', engName: 'drink', children: [
            { id:4, name: '에스프레소', engName: 'esspresso', children: [] },
            { id:5, name: '콜드브루', engName: 'coldbrew', children: [] },
            { id:6, name: '디카페인', engName: 'decaffeine', children: [] },
        ] },
        { id:2, name: '푸드', engName: 'food', children: [] },
        { id:3, name: '상품', engName: 'goods', children: [] },
    ];
    
    const [parentId, setParentId] = useState(-1);


    //== functions ==//
    /**
     * 네비게이션 메뉴 보여주기
     */
    const onClickNav = (categoryid: number = -1) => {
        const index = categories.findIndex(c => c.id === categoryid);

        
        if(index === -1) {
            setParentId(index);
            return;
        }
        
        setParentId(categories[index].id);
    };

    /**
     * 네비게이션 하위 메뉴 보여주기
     */
    const showSubMenus = () => {
        if (parentId < 0) return null;

        const index = categories.findIndex(c => c.id === parentId);
        if (index < 0) return null;

        const children = categories[index].children ?? [];
        return (
            <SubNavagationContainer
                ref={refLowNav} 
                categories={children}
                onClick={changeStyle}
            />
        );
    }

    /**
     * 선택한 메뉴의 css 변경하기
     */
    /**
     * 현재 선택한 카테고리의 css를 변경한다.
     */
    const changeStyle = (index: number) => {
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
        <>
            <NavigationContainer categories={categories} onClick={onClickNav}/>
            { showSubMenus() }
        </>
    );
}

export default SubHeaderContainer;