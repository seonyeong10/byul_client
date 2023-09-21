import { CircleBtn, Count, DDA } from "@components/button";
import { JustifyFlex } from "@components/section";
import { ItemWithLabel, OptChildWrap, OptionBox } from "@components/section";
import { PersonalOption } from "@components/section/div/PersonalOption";
import { Select } from "@components/section/form/Select";
import { FormBox, InfoBoxChild } from "@components/section";
import { ColorEmpasis } from "@components/text";
import { SelectType } from "@config/types/FormType";
import { MenuDetailType } from "@config/types/ItemType";
import { initReorder } from "@config/types/OrderType";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/modules";
import { addOption, reorder } from "src/redux/modules/order";


function OrderContainer() {
    const dispatch = useDispatch();
    const order = useSelector((state: RootState) => state.order); //주문
    const menu = useSelector((state: RootState) => state.menu);   //메뉴
    const refSelect = useRef<any>([]);
    // const refPersonal = useRef<HTMLDivElement>(null);
    const [personal, openBox] = useState(false);
    let _initReorder = { ...initReorder };

    /**
     * select box를 선택하면 글자 색을 변경하고 주문 state에 추가한다.
    */
    const handleSelect = ({ idx, name, value }: SelectType) => {
        // 글자색 변경
        refSelect.current[idx].style.color = 'rgba(0,0,0,1)';

        dispatch(addOption({ name, value }));

        //컵 선택이거나 빈 값이면 리턴
        if(name === 'pack' || value === "") {
            return;
        }

        // 가격 변경
        _initReorder = { ...initReorder };
        const _charge = menu.menuDetail?.filter((md: MenuDetailType) => md.sizes === value)[0].charge;
        _initReorder.price = menu.price + _charge;
        dispatch(reorder(_initReorder));
    }

    /**
     * 퍼스널 옵션 상자를 연다.
     */
    const openPersonalOption = () => {
        if(order.sizes === null || order.sizes === undefined || order.sizes === "") {
            alert("사이즈를 선택하세요.");
            return;
        }
        openBox(!personal);
    }

    /**
     * 주문 수량을 가감한다.
     */
    const handleOrderCount = {
        add: () => {
            let _count = order.count;
            dispatch(addOption({ name: "count", value: ++_count }));
        },
        minus: () => {
            let _count = order.count;
            
            if(--_count === 0) {
                alert("최소 주문 수량은 1 입니다.");
                return;
            }
            console.log('count', _count);
            dispatch(addOption({ name: "count", value: _count }));
        }
    }


    return (
        <FormBox gap={2}>
            <InfoBoxChild direction="column" gap={1}>
                <ItemWithLabel label="사이즈" key="size">
                    <Select id="form-size" name="sizes" ref={el => refSelect.current[0] = el} onChange={(e: any) => handleSelect({ idx: 0, name: e.target.name, value: e.target.value })}>
                        <option value={""}>사이즈를 선택하세요.</option>
                        { menu.menuDetail.map((md: MenuDetailType) => <option key={`size-${md.sizes}`} value={md.sizes}>{md.sizes}</option>) }
                    </Select>
                </ItemWithLabel>
                <ItemWithLabel label="컵" key="pack">
                    <Select id="form-pack" name="pack" ref={el => refSelect.current[1] = el} onChange={(e: any) => handleSelect({idx: 1, name: e.target.name, value: e.target.value})}>
                        <option value="">컵을 선택하세요.</option>
                        <option value="mug">매장컵</option>
                        <option value="tumbler">개인컵</option>
                    </Select>
                </ItemWithLabel>

                <DDA to="#" onClick={openPersonalOption}>퍼스널 옵션</DDA>
                <PersonalOption
                    open={personal}
                    // ref={refPersonal}
                />
            </InfoBoxChild>
            <JustifyFlex>
                    <OptionBox name="주문금액">
                        <OptChildWrap>
                            <CircleBtn type="button" className="icon minus" onClick={() => handleOrderCount.minus()}></CircleBtn>
                            <Count>{order.count}</Count>
                            <CircleBtn type="button" className="icon plus" onClick={() => handleOrderCount.add()}></CircleBtn>
                            <ColorEmpasis>{(order.count * (order.price + order.additionalCharge)).toLocaleString('ko-KR')} 원</ColorEmpasis>
                        </OptChildWrap>
                    </OptionBox>
            </JustifyFlex>
        </FormBox>
    );
}

export default OrderContainer;