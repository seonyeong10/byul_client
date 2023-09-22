import { ToggleBox } from "@components/section";
import { OptChildWrap, OptionBox } from "@components/section";
import { ItemChild } from "@components/section";
import { MenuDetailType } from "@config/types/ItemType";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/modules";

function MenuDetailContainer() {
    const menuDetail: MenuDetailType[] = useSelector((state: RootState) => state.menu.menuDetail);
    const refToggle = useRef<HTMLDivElement>(null);
    const refAlert = useRef<HTMLParagraphElement | null>(null);
    const [nowIdx, setIdx] = useState(0);

    /**
     * 선택한 사이즈의 영양정보를 보여준다.
     * @param detailid 
     */
    const showDetail = (index: number) => {
        // const detailidx = menuDetail.findIndex(md => md.id === detailid);
        const children = refToggle.current?.childNodes;

        //사이즈 토글박스의 style을 변경한다.
        children?.forEach((child, idx) => {
            const node = child as HTMLSpanElement;
            node.className = '';
            if(idx === index) node.className = 'on';
        });

        //영양정보 내용을 변경한다.
        const choose = menuDetail[index];
        setIdx(index);
    }

    
    return (
        <ItemChild direction="column" gap={1}>
            <ToggleBox ref={refToggle}>
                {
                    menuDetail.map((md, idx) =>
                        <span className={(idx === 0) ? 'on' : ''} onClick={() => showDetail(idx)}>{md.sizes}</span>
                    )
                }
            </ToggleBox>
            <OptionBox name={`${menuDetail[nowIdx]?.capacity ?? 0} ml`}></OptionBox>
            <OptionBox name="칼로리">
                <OptChildWrap><b>{menuDetail[nowIdx]?.calorie} Kcal</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="탄수화물">
                <OptChildWrap><b>{menuDetail[nowIdx]?.carbohydrate} g</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="당류">
                <OptChildWrap><b>{menuDetail[nowIdx]?.sugar} g</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="나트륨">
                <OptChildWrap><b>{menuDetail[nowIdx]?.sodium} mg</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="단백질">
                <OptChildWrap><b>{menuDetail[nowIdx]?.protein} g</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="지방">
                <OptChildWrap><b>{menuDetail[nowIdx]?.fat} g</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="콜레스테롤">
                <OptChildWrap><b>{menuDetail[nowIdx]?.cholesterol} mg</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="트랜스지방">
                <OptChildWrap><b>{menuDetail[nowIdx]?.transFat} g</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="카페인">
                <OptChildWrap><b>{menuDetail[nowIdx]?.caffeine} mg</b></OptChildWrap>
            </OptionBox>
            <OptionBox name="포화지방">
                <OptChildWrap><b>{menuDetail[nowIdx]?.saturFat} g</b></OptChildWrap>
            </OptionBox>
            <p ref={refAlert}>
                {/* 카페인 함유량이 0.15 이상이면 고카페인 음료이다. */}
                {
                    ((menuDetail[nowIdx]?.caffeine ?? 0) / (menuDetail[nowIdx]?.capacity ?? 1) > 0.15) ?
                    '※ 고카페인 함유 : 해당 제품은 고카페인 음료입니다. 어린이, 임산부, 카페인 민감자는 섭취에 주의해주시기 바랍니다.' 
                    : ''
                }
            </p>
        </ItemChild>
    );
}

export default MenuDetailContainer;