import { CountBtnLump } from "@components/button";
import { ItemChild } from "@components/section";
import { SectionTitle } from "@components/text";
import { SyrupType } from "@config/types/ItemType";
import { OptChildWrap, OptionBox, RadioLabel } from "@components/section";

import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/modules";
import { addOption } from "src/redux/modules/order";

type Type = {
    open: boolean,
}

// const PersonalOption = forwardRef<HTMLDivElement, Type>(({ open }, ref) => {
const PersonalOption = ({ open }: Type) => {
    const dispatch = useDispatch();
    const order = useSelector((state: RootState) => state.order); //★
    const menu = useSelector((state: RootState) => state.menu);
    const detail = menu.menuDetail.filter(md => md.sizes === order.sizes)[0]; //★


    if(!open) {
        return null;
    }
    
    /**
     * 퍼스널 옵션의 수량을 변경한다.
     */
    const handlecount = {
        init: () => {
            if(order.sizes === '') {
                alert('사이즈를 선택하세요.');
                return false;
            }
            return true;
        },
        add: (name: string) => {
            // event?.preventDefault(); //deprecated
            if(!handlecount.init()) return;

            const basis = detail[name] ?? 0; //기본값
            let count = order[name] + 1;
            if((basis + count) > 10) {
                alert('수량은 10보다 작아야 합니다.');
                return;
            }
            dispatch(addOption({ name, value: count }));
            dispatch(addOption({ name: 'additionalCharge', value: order.additionalCharge + 600 }));
        },
        subtract: (name: string) => {
            if(!handlecount.init()) return;
            
            const basis = detail[name] ?? 0; //기본값
            let count = order[name] - 1;
            if(count > basis) {
                alert('수량은 0보다 커야 합니다.');
                return;
            }
            dispatch(addOption({ name, value: count }));
            dispatch(addOption({ name: 'additionalCharge', value: order.additionalCharge - 600 }));
        },
        addType: (type: string, name: string = "") => {
            if(!handlecount.init()) return;

            if(name === "" || name === undefined) return;

            //==변수==//
            let charge = 600; //추가 금액

            //==변경값==//
            const options = [...order[type]] ?? [];
            const index = order[type].findIndex((order: SyrupType) => order.name === name);

            const tobe = options[index] ? { name: name, count: (options[index].count + 1) } : { name: name, count: 1 };


            //==저장==//
            if(index > -1) {
                //이전 값이 있으면 변경
                options[index] = tobe;
            } else {
                //없으면 추가
                options.push(tobe);
            }

            dispatch(addOption({ name: type, value: options }));

            dispatch(addOption({ name: "additionalCharge", value: (order.additionalCharge + charge) }));
        },
        subtractType: (type: string, name: string = "") => {
            if(!handlecount.init()) return; 

            if(name === "" || name === undefined) return;

            //==변수==//
            let charge = -600;

            //==기존값==//
            const basis = [...detail[type] ?? []]
            const basisIndex = basis.findIndex((basis: SyrupType) => basis.name === name);
            const basisCount = basisIndex > -1 ? basis[basisIndex].count : 0;

            //==변경값==//
            const options = [...order[type]] ?? [];
            const index = order[type].findIndex((order: SyrupType) => order.name === name);
            const tobe = options[index] ? { name: name, count: (options[index].count - 1) } : { name: name, count: 0 };

            if((tobe.count + basisCount) < 0) {
                alert("수량은 0보다 커야 합니다.");
                return;
            }

            //==저장==//
            if(index > -1) {
                //이전 값이 있으면 변경
                options[index] = tobe;
            } else {
                //없으면 추가
                options.push(tobe);
            }
            dispatch(addOption({ name: type, value: options }));

            dispatch(addOption({ name: "additionalCharge", value: (order.additionalCharge + charge) }));
        },
        setOption: (e : ChangeEvent<HTMLInputElement>) => {
            if(!handlecount.init()) return;

            let { name, value } = e.target as HTMLInputElement; //선택값
            const basis = detail[name] ?? ''; //기본
            const lastOrdered = order[name] ?? ''; //이전 선택
            let charge = 0;

            if((basis === lastOrdered || lastOrdered === "") && (value !== lastOrdered)) {
                //원래값 → 다른값
                charge += 600;
            } else if((basis !== value) && (value !== lastOrdered)) {
                //다른값 → 다른값
            } else if((basis == value) && (value !== lastOrdered)) {
                //다른값 → 원래값
                charge -= 600;
            }


            dispatch(addOption({ name, value }));
            dispatch(addOption({ name: 'additionalCharge', value: (order.additionalCharge + charge) }));
        } 
    }

    /**
     * 시럽의 수량을 계산한다.
     */
    const countSyrup = (name: string) => {
        //==기본값==//
        const basis = [...detail?.syrup ?? []];
        const basisIdx = basis.findIndex(b => b.name === name);
        const bCount = basisIdx < 0 ? 0 : basis[basisIdx].count; 

        //==추가값==//
        const add = [...order.syrup ?? []];
        const addIdx = add.findIndex(a => a.name === name);
        const aCount = addIdx < 0 ? 0 : add[addIdx].count;

        return (bCount + aCount);
    };


    return (
        <ItemChild direction="column" gap={1}>
            <OptionBox name="에스프레소 샷">
                <CountBtnLump
                    variable="espresso"
                    count={(detail?.espresso ?? 0) + order.espresso}
                    minusFC={handlecount.subtract} 
                    plusFC={handlecount.add} />
            </OptionBox>
            <div>
                <SectionTitle>시럽</SectionTitle>
                <OptionBox name="클래식" padding={{left: 1}}>
                    <CountBtnLump
                        variable="syrup" 
                        value="클래식" 
                        count={countSyrup("클래식")} 
                        minusFC={handlecount.subtractType} 
                        plusFC={handlecount.addType} />
                </OptionBox>
                <OptionBox name="바닐라" padding={{left: 1}}>
                    <CountBtnLump
                        variable="syrup" 
                        value="바닐라" 
                        count={countSyrup("바닐라")} 
                        minusFC={handlecount.subtractType} 
                        plusFC={handlecount.addType} />
                </OptionBox>
                <OptionBox name="헤이즐넛" padding={{left: 1}}>
                    <CountBtnLump
                        variable="syrup" 
                        value="헤이즐넛" 
                        count={countSyrup("헤이즐넛")} 
                        minusFC={handlecount.subtractType} 
                        plusFC={handlecount.addType} />
                </OptionBox>
            </div>
            <OptionBox name="우유">
                <OptChildWrap>
                    <RadioLabel htmlFor="milketype-regular">
                        <input id="milketype-regular"
                            type="radio"
                            name="milkType"
                            value="regular"
                            checked={order.milkType !== "" ? (order.milkType === "regular") : (detail?.milkType === "regular")}
                            onChange={(e) => handlecount.setOption(e)} />
                        일반
                    </RadioLabel>
                    <RadioLabel htmlFor="milketype-oat">
                        <input id="milketype-oat" 
                            type="radio" 
                            name="milkType" 
                            value="oat" 
                            checked={order.milkType !== "" ? (order.milkType === "oat") : (detail?.milkType === "oat")}
                            onChange={(e) => handlecount.setOption(e)} />
                        오트
                    </RadioLabel>
                    <RadioLabel htmlFor="milketype-almond">
                        <input id="milketype-almond" 
                            type="radio" 
                            name="milkType" 
                            value="almond" 
                            checked={order.milkType !== "" ? (order.milkType === "almond") : (detail?.milkType === "almond")}
                            onChange={(e) => handlecount.setOption(e)} />
                        아몬드
                    </RadioLabel>
                </OptChildWrap>
            </OptionBox>
        </ItemChild>
    );
}
// });

export { PersonalOption };