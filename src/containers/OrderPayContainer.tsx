import { GapFlex } from "@components/div";
// import reactSvg from "@assets/react.svg";
import { ButtonWrap, Charge, CircleImg, /*Discount,*/ GreyBox, GroupName, LineBox, MethodWrap, PaddingBox, PageTitle, PayMethod } from "@components/payment";
import { Button, LinedButton } from "@components/button";
import { useEffect, useState } from "react";
import { OrderItemType } from "@config/types/OrderType";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PrepareType } from "@config/types/PaymentType";
//import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "@redux-modules/index";
//import { set } from "@redux-modules/payment";


function OrderPayContainer() {
    const [order, setOrder] = useState<OrderItemType[]>([]);

    const params = useParams();
    const [pay_method, setMethod] = useState('card');

    //== axios ==//
    const axiosHeader = {
        "Content-type": 'application/json;charset=UTF-8'
    };

    //== variable ==//
    const total_amount = order.map(o => o.orderPrice).reduce((o1, o2) => o1 + o2, 0);

    useEffect(() => {
        axios.get(`http://localhost:8090/api/v1/order/${params.orderId}`, {
            headers: axiosHeader
        }).then(res => {
            const data = res.data;

            if (data.status[0] !== 'ORDER') {
                alert("이미 결재 완료된 주문입니다.");
                return;
            }
            setOrder(data.orderItems);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const payMyOrder = async () => {
        if (!params.orderId) return;

        const prepayment: PrepareType = {
            orderId: params.orderId ?? -1,
            itemName: order[0].item.name,
            quantity: order.map(o => o.count).reduce((o1, o2) => o1 + o2),
            totalAmount: total_amount
        }
        
        const url = `http://localhost:8090/api/v1/order/${35}/pay/${pay_method}`;

        console.log('url >>> ' , url);

        const paymentTid = document.querySelector("#payment-tid") as HTMLInputElement;
        //window.open("http://localhost:5173/order/pay/kakao/success?pg_token=0cf793952a52302ec7ab", "_blank");
        
        await axios.get(url, {
            headers: axiosHeader,
            params: prepayment
        }).then (res => {
            console.log(res);

            //tid를 저장한다.
            paymentTid.value = res.data.tid;
            window.open(res.data.next_redirect_pc_url, "_blank");

        }).catch (err => {
            console.log(err);
        })
    }

    return(
        <GapFlex direction="column" gap={2}>
            <PageTitle>결제하기</PageTitle>
            <input type="text" name="orderId" value={params.orderId} id="payment-orderId" />
            <input type="text" name="tid" value="" id="payment-tid" />
            <GreyBox>
                <GroupName>주문 내역</GroupName>
                <PaddingBox>
                    {
                        order && order.map(o => {
                            const options = [];

                            if (o.espresso) {
                                options.push(<p>에스프레소 {o.espresso}<Charge>+{(o.espresso * 600).toLocaleString("ko-KR")}원</Charge></p>);
                            }
                            
                            if (o.syrup) {
                                o.syrup.map(s =>{ 
                                    options.push(<p>{s.name} 시럽 {s.count}<Charge>+{(s.count * s.additionalCharge).toLocaleString("ko-KR")}원</Charge></p>);
                                });
                            }

                            if (o.milkType) {
                                options.push(<p>{o.milkType[1]} 우유<Charge>+600원</Charge></p>);
                            }

                            if (o.drizzle) {
                                options.push(<p>{o.drizzle}<Charge>+600원</Charge></p>);
                            }

                            if (o.whipping) {
                                options.push(<p>{o.whipping}<Charge>+600원</Charge></p>);
                            }

                            if (o.topping) {
                                options.push(<p>{o.topping}<Charge>+600원</Charge></p>);
                            }

                            return (
                                <GapFlex gap={2}>
                                    <CircleImg src={`http://localhost:8090/api/v1/image/${o.item.attachFile.id}`}/>
                                    <div>
                                        <p><b>{o.item.name}<Charge>{o.orderPrice?.toLocaleString("ko-KR")}원</Charge></b></p>
                                        <p>{o.temp} | {o.sizes}<Charge>{o.item.price?.toLocaleString("ko-KR")}원</Charge></p>
                                        {options}
                                    </div>
                                </GapFlex>
                            );
                        })
                    }
                </PaddingBox>
            </GreyBox>
            <LineBox>
                <GroupName>결제 수단</GroupName>
                <MethodWrap>
                    <input id="payment-CREDIT" type="radio" name="payment" value="card" checked={pay_method === 'card'} onChange={() => setMethod('card')} />
                    <PayMethod htmlFor="payment-CREDIT">신용카드</PayMethod>
                    <input id="payment-KAKAO" type="radio" name="payment" value="kakao" checked={pay_method === 'kakao'} onChange={() => setMethod('kakao')} />
                    <PayMethod htmlFor="payment-KAKAO">카카오페이</PayMethod>
                </MethodWrap>
            </LineBox>
            {/*
            <LineBox>
                <GroupName>쿠폰 및 할인</GroupName>
                <MethodWrap>
                    <input id="payment-CREDIT" type="radio" name="discount" value="CREDIT" />
                    <PayMethod htmlFor="payment-CREDIT">쿠폰</PayMethod>
                </MethodWrap>
            </LineBox>
            */}
            <LineBox>
                <p><GroupName>주문 금액<Charge>{total_amount.toLocaleString("ko-KR")}원</Charge></GroupName></p>
                <p><GroupName>할인 금액<Charge>0원</Charge></GroupName></p>
                <p><GroupName>최종 결제 금액<Charge>{total_amount.toLocaleString("ko-KR")}원</Charge></GroupName></p>
            </LineBox>
            <ButtonWrap>
                <LinedButton>취소하기</LinedButton>
                <Button onClick={() => payMyOrder()}>{total_amount.toLocaleString("ko-KR")}원 결제하기</Button>
            </ButtonWrap>
        </GapFlex>
    );
}

export default OrderPayContainer;