import { ColorButton, ColorLinedButton } from "@components/button";
import { GapFlex } from "@components/div";
import { OptChildWrap, OptionBox } from "@components/form";
import { DetailBox, DetailWrapper, InfoStatusWrapper, Status, StatusWrap } from "@components/info";
import { TName } from "@components/list";
import { ColorEmpasis } from "@components/title";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { HistoryType, toPersonalOrder } from "@config/types/HistoryType";
import axios from "axios";
import { SyrupType } from "@config/types/ItemType";
import { PersonalOrderType } from "@config/types/OrderType";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux-modules/index";

//== style ==//
const ButtonWrap = styled.div`
    padding-top: 3vw;
`;

function OrderHistoryInfoContainer() {
    const [history, record] = useState<HistoryType>();
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    //== redux ==//
    const { memberId } = useSelector((state: RootState) => ({ memberId: state.user.id }));

    //== axios ==//
    const axiosHeader = {
        "Content-type": 'application/json;charset=UTF-8'
    };

    useEffect(() => {
        if(memberId < 0 || memberId === null || memberId === undefined) {
            //alert("로그인 후 이용해주세요.");
            //return;
        }

        axios.get(`http://localhost:8090/api/v1/my/${1}/history/${params.orderId}`, {
            headers: axiosHeader
        })
        .then(res => {
            // console.log(res);
            record(res.data);
        }).catch(err => {
            console.log(err);
        })

    }, []);

    /**
     * 옵션 컴포넌트를 표시한다.
     */
    const displayOption = {
        espresso: (count: number) => {
            if(count === null || count === undefined) {
                return null;
            }
            return <OptionBox name={`에스프레소 ${count}`}><OptChildWrap><b>{(count * 600).toLocaleString("ko-KR")}원</b></OptChildWrap></OptionBox>;
        },
        syrup: (syrups: SyrupType[]) => {
            if(syrups === null || syrups === undefined || syrups.length === 0) {
                return null;
            }
            return syrups.map(s => <OptionBox name={`${s.name} 시럽 ${s.count}`}><OptChildWrap><b>{(s.count * s.additionalCharge).toLocaleString("ko-KR")}원</b></OptChildWrap></OptionBox>);
        },
        milk: (milk: string[]) => {
            if(milk === null || milk === undefined) {
                return null;
            }
            return <OptionBox name={`${milk[1]} 우유`}><OptChildWrap><b>600원</b></OptChildWrap></OptionBox>;
        }
    }

    //== function ==//
    /**
     * 이대로 메뉴 담기: 주문 상품을 장바구니에 담는다.
     */
    const putBackInCart = () => {
        const orders = new Array<PersonalOrderType>;
        history?.orderItems.forEach(oi => orders.push(toPersonalOrder(oi)));

        axios.post(`http://localhost:8090/api/v1/my/${1}/cart`, { "orderItems": orders }, {
            headers: axiosHeader
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                alert("장바구니에 담았습니다.");
            }
        }).catch(err => console.log(err));
    }

    /**
     * 목록으로 돌아가기: 주문 히스토리 목록 화면으로 돌아간다.
     */
    const backToHistory = () => {
        navigate(`/my/${1}/history`);
    }

    /**
     * 취소하기: 주문을 취소한다.
     */
    const cancel = () => {
        if(history?.status[0] !== 'ORDER') {
            alert("'주문완료' 상태에서만 취소할 수 있습니다.");
            return;
        }

        axios.put(`http://localhost:8090/api/v1/my/${1}/history/${params.orderId}`, null, {
            headers: axiosHeader
        }).then(res => {
            // console.log(res);
            if(res.status === 200) {
                alert("주문이 취소되었습니다.");
                navigate(location.pathname);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    if(memberId < 0 || memberId === null || memberId === undefined) {
        alert("로그인 후 이용해주세요.");
        return null;
    }

    return (
        <InfoStatusWrapper >
            <StatusWrap>
                {
                    history?.status[0] === 'CANCEL' ?
                        <Status className={history?.status[0] === 'CANCEL' ? 'curr' : ''}>
                            <p>취소완료</p>
                            <p>{history?.modifiedDate}</p>
                        </Status>
                        : <Status className={history?.status[0] === 'ORDER' ? 'curr' : ''}>
                            <p>주문완료</p>
                            <p>{history?.createdDate}</p>
                        </Status>
                }
                <Status className={history?.status[0] === 'READY' ? 'curr' : ''}>
                    <p>준비중</p>
                    <p>{history?.acceptedDate ?? '-'}</p>
                </Status>
                <Status className={history?.status[0] === 'FIN' ? 'curr' : ''}>
                    <p>준비완료</p>
                    <p>{history?.finishedDate ?? '-'}</p>
                </Status>
                <Status className={history?.status[0] === 'PICKED' ? 'curr' : ''}>
                    <p>픽업완료</p>
                    <p>{history?.status[0] === 'PICKED' ? history?.modifiedDate : '-'}</p>
                </Status>
            </StatusWrap>

            <DetailWrapper>
                {
                    history?.orderItems.map(ordered => {
                        return (
                            <DetailBox>
                                <TName>{ordered.item.name}</TName>
                                <OptionBox name={`${ordered.temp} | ${ordered.sizes} | ${ordered.pack}`}>
                                    <OptChildWrap><b>{ordered.price.toLocaleString("ko-KR")}원</b></OptChildWrap>
                                </OptionBox>
                                {displayOption.espresso(ordered.espresso)}
                                {displayOption.syrup(ordered.syrup)}
                                {displayOption.milk(ordered.milkType)}
                            </DetailBox>
                        );
                    })
                }
                <DetailBox>
                    <TName>아이스 아메리카노</TName>
                    <OptionBox name={`ICED | Tall | 일회용컵`}>
                        <OptChildWrap><b>4,500원</b></OptChildWrap>
                    </OptionBox>
                    <OptionBox name={`에스프레소 1`}>
                        <OptChildWrap><b>600원</b></OptChildWrap>
                    </OptionBox>
                    <OptionBox name={`바닐라 시럽 1`}>
                        <OptChildWrap><b>600원</b></OptChildWrap>
                    </OptionBox>
                </DetailBox> 
                <OptionBox name={`합계`}>
                    <OptChildWrap><b>{history?.totalPrice.toLocaleString("ko-KR")}원</b></OptChildWrap>
                </OptionBox>
            </DetailWrapper>

            <DetailWrapper>
                <DetailBox>
                    <OptionBox name={`신용카드`}>
                        <OptChildWrap><b>{history?.totalPrice.toLocaleString("ko-KR")}원</b></OptChildWrap>
                    </OptionBox>
                </DetailBox>
                <OptionBox name={`총 ${history?.totalCount}개`}>
                    <OptChildWrap><ColorEmpasis>{history?.totalPrice.toLocaleString("ko-KR")}원</ColorEmpasis></OptChildWrap>
                </OptionBox>
            </DetailWrapper>

            <ButtonWrap>
                <GapFlex gap={2}>
                    <ColorLinedButton onClick={() => backToHistory()}>목록으로 돌아가기</ColorLinedButton>
                    <ColorButton onClick={() => putBackInCart()}>이대로 메뉴 담기</ColorButton>
                    {
                        history?.status[0] === 'ORDER' ? 
                        <ColorLinedButton onClick={() => cancel()}>취소하기</ColorLinedButton> : null
                    }
                    {/* <ColorLinedButton>취소하기</ColorLinedButton> */}
                </GapFlex>
            </ButtonWrap>

        </InfoStatusWrapper>
    );
}

export default OrderHistoryInfoContainer;