import { GapFlex } from "@components/section";
// import reactSvg from "@assets/react.svg";
import { ButtonWrap, CircleImg, LineBox, MethodWrap, PaddingBox, PayMethod } from "@components/section";
import { PageTitle, GroupName, Charge, GreyBox, /*Discount,*/  } from "@components/text";
import { Btn } from "@components/button";
import { useEffect, useState } from "react";
import { OrderItemType } from "@config/types/OrderType";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PrepareType } from "@config/types/PaymentType";
import { useSelector } from "react-redux";
import { RootState } from "@redux-modules/index";
import { axiosHeader } from "@config/axiosConfig";
import { Modal } from "@components/popup/Modal";
import { CustomBtn } from "@components/button";
//import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "@redux-modules/index";
//import { set } from "@redux-modules/payment";


function OrderPayContainer() {
    const [order, setOrder] = useState<OrderItemType[]>([]);
    const userId = useSelector((state: RootState) => state.user.id);

    const params = useParams();
    const [pay_method, setMethod] = useState('card');
    const [modal, setModal] = useState({open: false, status:"", message: ""});
    const navigator = useNavigate();

    //== variable ==//
    const total_amount = order.map(o => o.orderPrice).reduce((o1, o2) => o1 + o2, 0);

    useEffect(() => {
        axios.get(`http://localhost:8090/api/v1/order/${params.orderId}`, {
            headers: axiosHeader
        }).then(res => {
            const data = res.data;

            if (data.status[0] !== 'ORDER') {
                alert("이미 결재 완료된 주문입니다.");
                navigator(-1);
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
        
        const url = `http://localhost:8090/api/v1/order/${userId}/pay/${pay_method}`;

        console.log('url >>> ' , url);

        await axios.get(url, {
            headers: axiosHeader,
            params: prepayment
        }).then (res => {
            console.log(res);

            //tid를 저장한다.
            const message = {
                order_id: params.orderId ?? "-1",
                tid: res.data.tid
            }
            //popupFunction({url: res.data.next_redirect_pc_url, message: message});
            popupFunction({url: "http://localhost:5173/order/pay/kakao/success", message: message});
        }).catch (err => {
            console.log(err);
        })
    }

    //팝업창에서 부모창 닫기
    function popupFunction({url = "", message = { order_id: "-1", tid: "" }}) {
        if (typeof window !== undefined) {
            let popup = window.open(url, "_blank");
    
            //결제완료 처리하기(callback)
            window.parentCallback = (status: string) => {
                popup?.close();
                const _modal = {...modal};
                
                _modal.open = !_modal.open;
                _modal.status = status;
                if (status === "success") {
                    _modal.message = "결제가 완료되었습니다.";
                } else {
                    _modal.message = "결제에 실패했습니다.";
                }

                setModal(_modal);

            }

            //팝업으로 보낸 메시지 확인하기
            window.receiveMessage = () => message;
        }
    }

    const closeModal = () => {
        if (modal.status === "success") {
            navigator(`/my/${userId}/history`);
            return;
        }
        setModal({ open: !modal.open, status: "", message: "" });
    }
    
    return(
        <GapFlex direction="column" gap={2}>
            <PageTitle>결제하기</PageTitle>
            
            <Modal isOpen={modal.open} closeModal={() => closeModal()}>
                <p style={{textAlign: "center", marginBottom: "1vw"}}>{modal.message}</p>
                <br/>
                <GapFlex gap={2}>
                    <CustomBtn onClick={() => closeModal()}>닫기</CustomBtn>
                    <Btn onClick={() => closeModal()}>확인</Btn>
                </GapFlex>
            </Modal>

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
                <CustomBtn onClick={() => navigator(-1)}>취소하기</CustomBtn>
                <Btn onClick={() => payMyOrder()}>{total_amount.toLocaleString("ko-KR")}원 결제하기</Btn>
            </ButtonWrap>
        </GapFlex>
    );
}

export default OrderPayContainer;