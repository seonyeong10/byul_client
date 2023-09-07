import { Center, GridFooter, JustifyFlex, Line } from "@components/div";
import { ListHeader, ListWrapper, TBody, TBodyChild, TName } from "@components/list";
// import reactSvg from "@assets/react.svg";
import { Anchor, Button, CountBtnLump } from "@components/button";
import { SectionTitle } from "@components/title";
import { SmallText } from "@components/text";
import { OptChildWrap, OptionBox } from "@components/form";

import { ChangeEvent, useEffect, useState, useRef } from "react";
import axios from "axios";
import { OrderItemType, PersonalOrderType } from "@config/types/OrderType";
import qs from "qs";
import { useSelector } from "react-redux";
import { RootState } from "@redux-modules/index";


function toOrderType(cart: OrderItemType) {
    const changed: PersonalOrderType = {
        itemId: cart.item.id,
        sizes: cart.sizes,
        pack: cart.pack,
        count: cart.count,
        additionalCharge: cart.additionalPrice,
        price: cart.price,
        temp: cart.temp,
        syrup: cart.syrup,
        whipping: cart.whipping,
        drizzle: cart.drizzle ?? '',
        topping: cart.topping,
        espresso: cart.espresso,
        milkType: cart.milkType[0]
    }
    return changed;
}
function CartContainer() {
    //== state ==//
    const [cart, addCart] = useState<OrderItemType[]>([]);
    const amountRefs = useRef<null[] | HTMLElement[]>([]);
    const chooses = new Set<Number>();

    //== redux ==//
    const { memberId } = useSelector((state: RootState) => ({ memberId: state.user.id }));

    //== axios ==//
    const axiosHeader = {
        "Content-type": 'application/json;charset=UTF-8'
    };
    
    useEffect(() => {
        if(memberId < 0 || memberId === null || memberId === undefined) {
            return;
        }

        axios.get(`http://localhost:8090/api/v1/my/${memberId}/cart`, {
            headers: axiosHeader
        }).then(res => {
            console.log(res.data);
            addCart(res.data);
        }).catch(err => {
            console.log(err);
        });

    }, []);

    

    /**
     * 장바구니 상품을 선택한다.
     */
    const onClickCheckBox = (id: number) => {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const checkAll = document.querySelector("input[name='all']") as HTMLInputElement;
    

        //체크박스 선택, 해제
        checkboxes.forEach(chk => {
            const input = chk as HTMLInputElement;

            //수량변경 후 초기화
            if(input.value !== 'on' && input.checked) {
                chooses.add(Number(input.value));
            }

            if(Number(input.value) === id) {
                input.checked = !input.checked;

                if(!input.checked) {
                    chooses.delete(id);
                } else {
                    chooses.add(id);
                }
            }
        });

        //모두 선택했으면 전체선택 활성화, 반대는 비활성화
        checkAll.checked = (chooses.size === cart.length);
        //최종 수량, 가격 변경
        handleAmountRefs.init();
        
    };

    /**
     * 주문하기
     */
    const onClickOrder = async() => {
        const orders: PersonalOrderType[] = [];

        chooses.forEach(ch => orders.push(toOrderType(cart.filter(c => c.id === ch)[0])));

        console.log(orders);

        //주문
        await axios.post(`http://localhost:8090/api/v1/order/${1}`, { "orderItems": orders }, {
            headers: axiosHeader
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                alert("주문이 완료되었습니다.");
            }
        }).catch(err => {
            console.log(err);
        });
        
        console.log(chooses);
        //주문 완료 후 삭제
        await onClickDelete();
    }

    const onClickDelete = async () => {
        const removes = Array.from(chooses);

        await axios.delete(`http://localhost:8090/api/v1/my/${1}/cart/delete`, {
            params: { cartIds: removes },
            headers: axiosHeader,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                alert("삭제되었습니다.");
            }
        }).catch(err => {
            console.log(err);
        });

        //체크박스 초기화
        chooses.clear();
        //상품 삭제
        addCart(cart.filter(c => !removes.includes(c.id)));
    }

    const onClickDeleteAll = async () => {
        //전체선택
        const checkboxes = document.querySelectorAll("input[type='checkbox']"); //전체 체크박스
        const checkAll = document.querySelector("input[name='all']") as HTMLInputElement; //전체선택 체크박스
        checkboxes.forEach(chk => {
            const input = chk as HTMLInputElement;
            input.checked = true;
        });


        await axios.delete(`http://localhost:8090/api/v1/my/${1}/cart/delete/all`)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        
        //초기화
        checkAll.checked = false;
        chooses.clear();
        addCart([]);
    }

    /**
     * 상품을 모두 선택/해제한다.
     */
    const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(chk => {
            const input = chk as HTMLInputElement;
            input.checked = e.target.checked;
        })
    }

    /**
     * 상품의 수량을 변경한다.
     */
    const handleCount = {
        plus: (id: number) => {
            const _cart = [...cart];
            const findindex = _cart.findIndex(c => c.id === id);
            const cartitem = _cart[findindex];

            cartitem.orderPrice = (cartitem.orderPrice / cartitem.count) * (++cartitem.count);

            addCart(_cart); //chooses 초기화
            handleAmountRefs.init();
        },
        minus: (id: number) => {
            const _cart = [...cart];
            const findindex = _cart.findIndex(c => c.id === id);
            const cartitem = _cart[findindex];
            if(cartitem.count < 2) {
                return;
            }

            cartitem.orderPrice = (cartitem.orderPrice / cartitem.count) * (--cartitem.count);

            addCart(_cart); //chooses 초기화
            handleAmountRefs.init();
        }
    }

    const handleAmountRefs = {
        init: () => {
            handleAmountRefs.count();
            handleAmountRefs.price();
        },
        count: () => {
            const selected = Array.from(chooses);

            const ref = amountRefs.current[0] ?? null;
            if(ref === null) {
                return;
            }

            ref.innerText = cart.filter(c => selected.includes(c.id))
                                .map(c => c.count)
                                .reduce((prev, next) => prev + next, 0) + "";
            
        },
        price: () => {
            const selected = Array.from(chooses);
            const ref = amountRefs.current[1] ?? null;
            if(ref === null) {
                return;
            }

            ref.innerText = cart.filter(c => selected.includes(c.id))
                                .map(c => c.orderPrice)
                                .reduce((prev, next) => prev + next, 0).toLocaleString('ko-KR') + "";
        }
    }


    if(memberId < 0 || memberId === null || memberId === undefined) {
        alert("로그인 후 이용해주세요.");
        return null;
    }
    

    return (
        <ListWrapper>
            <ListHeader>
                <SectionTitle><input type="checkbox" name="all" onChange={(e) => selectAll(e)}/></SectionTitle>
                <OptChildWrap>
                    <Anchor onClick={() => onClickDelete()}>선택삭제</Anchor>
                    <Anchor condition="delemiter" onClick={() => onClickDeleteAll()}>전체삭제</Anchor>
                </OptChildWrap>
            </ListHeader>
            {
                cart.map(c =>  {
                    return (
                        <>
                            <TBody condition="check" num={c.id} onClick={onClickCheckBox} imgSrc={`http://localhost:8090/api/v1/image/${c.item.attachFile.id}`}>
                                <TBodyChild>
                                    <TName>
                                        {c.item.name}
                                        <SmallText>{c.item.engName}</SmallText>
                                    </TName>
                                    <OptionBox name={`${c.temp} | ${c.sizes} | ${c.pack}`}>
                                        <OptChildWrap>{(c.price ?? 0).toLocaleString('ko-KR')} 원</OptChildWrap>
                                    </OptionBox>
                                    {
                                        c.espresso < 1 ? null 
                                            : <OptionBox name={`에스프레소 ${c.espresso}`}>
                                                <OptChildWrap>{(c.espresso * 600).toLocaleString('ko-KR')} 원</OptChildWrap>
                                            </OptionBox>
                                    }
                                    {
                                        c.syrup.length < 1 ? null 
                                            : c.syrup.map(s => {
                                                return (
                                                    <OptionBox name={`${s.name}시럽 ${s.count}`}>
                                                        <OptChildWrap>{(s.count * 600).toLocaleString('ko-KR')} 원</OptChildWrap>
                                                    </OptionBox>
                                                );
                                            })
                                    }
                                    {
                                        (c.milkType === null || c.milkType === undefined) ? null 
                                            : <OptionBox name={`${c.milkType[1]} 우유`}>
                                                <OptChildWrap>{600} 원</OptChildWrap>
                                            </OptionBox>
                                    }
                                </TBodyChild>
                            </TBody>
                            <Center>
                                <CountBtnLump
                                    variable=""
                                    value=""
                                    count={c.count}
                                    minusFC={() => handleCount.minus(c.id)}
                                    plusFC={() => handleCount.plus(c.id)}
                                />
                            </Center>
                            <Center>- 0 원</Center>
                            <Center>{c.orderPrice.toLocaleString('ko-KR')} 원</Center>
                            <Line />
                        </>
                    );
                })
            }

            <GridFooter>
                <JustifyFlex>
                    <span>총 <b ref={el => amountRefs.current[0] = el}>0</b>개 / 20개</span>
                    {/* <SectionTitle>{cart.map(c => c.orderPrice).reduce((prev, next) => prev + next, 0).toLocaleString('ko-KR')} 원</SectionTitle> */}
                    <SectionTitle><span ref={el => amountRefs.current[1] = el}>0</span> 원</SectionTitle>
                </JustifyFlex>
                <Button onClick={() => onClickOrder()}>주문하기</Button>
            </GridFooter>
        </ListWrapper>
    );
}

export default CartContainer;