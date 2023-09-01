import { Center, Line } from "@components/div";

import { SmallText } from "@components/text";
import { ListHeader, ListWrapper, TBody, TBodyChild, TName } from "@components/list";
import { Anchor } from "@components/button";
import { SectionTitle } from "@components/title";
import { OptionBox } from "@components/form";
import PeriodPopupContainer from "./popup/PeriodPopupContainer";

import { useEffect, useState } from "react";
import axios from "axios";
import { HistoryType } from "@config/types/HistoryType";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux-modules/index";
import { PageTitle } from "@components/payment";
import { Modal } from "@components/popup/Modal";

type HistoryParamType = {
    startDate: string,
    endDate: string
}

function OrderHistroyContainer() {
    //== state ==//
    const [periodSetting, openPeriodSetting] = useState(false);
    const [params, search] = useState<HistoryParamType>({
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10)
    });
    const [histories, initHistory] = useState<HistoryType[]>([]);
    const navigator = useNavigate();
    const [isOpen, setOpen] = useState(false);

    //== redux ==//
    const { memberId } = useSelector((state: RootState) => ({ memberId: state.user.id }));

    //== axios ==//
    const axiosHeader = {
        "Content-type": 'application/json;charset=UTF-8'
    };

    //== init ==//
    useEffect(() => {
        getData();
    }, []);

    //== function ==//
    /**
     * 데이터를 불러온다.
     */
    const getData = () => {
        if(memberId < 0 || memberId === null || memberId === undefined) {
            //alert("로그인 후 이용해주세요.");
            return;
        }

        axios.get(`http://localhost:8090/api/v1/my/${memberId}/history`, {
            params: params,
            headers: axiosHeader
        }).then(res => {
            // console.log(res.data);
            initHistory(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const onClickHistory = (orderId: number) => {
        console.log(orderId);
        navigator(`/my/${1}/history/${orderId}`);
    }

    const setSearchParam = (from: string, to: string) => {
        search({ startDate: from, endDate: to });
    }

    /**
     * 기간 설정 팝업을 연다.
     */
    const openPeriod = () => {
        getData();
        openPeriodSetting(!periodSetting);
    }

    const handleModal = () => {
        setOpen(!isOpen);
    }

    // if(memberId < 0 || memberId === null || memberId === undefined) {
    //     alert("로그인 후 이용해주세요.");
    //     return null;
    // }

    return(
        <ListWrapper>
            <PageTitle>주문 히스토리</PageTitle>
            <ListHeader>
                <p style={{padding: '10px 0'}}>{params.startDate} ~ {params.endDate}</p>
                {/* <Anchor to="#" onClick={() => openPeriod()}>기간 설정</Anchor> */}
                <Anchor to="#" onClick={() => handleModal()}>기간 설정</Anchor>
            </ListHeader>
            <Modal isOpen={isOpen} closeModal={handleModal}>
                <PeriodPopupContainer open={periodSetting} params={params} search={setSearchParam} close={() => handleModal()}/>
            </Modal>
            
            {
                histories.map((his, index) => {
                    return (
                        <>
                            <TBody condition="index" num={index+1} onClick={onClickHistory} imgSrc={`http://localhost:8090/api/v1/image/${his.orderItems[0].item.attachFile.id}`}>
                                <TBodyChild>
                                    <TName>
                                        {
                                            (his.totalCount < 2) ?
                                            his.orderItems[0].item.name
                                            : `${his.orderItems[0].item.name} 외 ${his.totalCount - 1}건`
                                        }
                                        <SmallText>{his.orderItems[0].item.engName}</SmallText>
                                    </TName>
                                    <OptionBox name={`${his.orderItems[0].temp} | ${his.orderItems[0].sizes} | ${his.orderItems[0].pack}`} />
                                </TBodyChild>
                            </TBody>
                            <Center>{his.status[1]}</Center>
                            <Center>{his.createdDate}</Center>
                            <Center>{his.totalPrice.toLocaleString('ko-KR')} 원</Center>
                            <Line />
                        </>
                    );
                })
            }
            <>
                <TBody condition="index" num={1} onClick={onClickHistory}>
                    <TBodyChild>
                        <TName>
                            아이스 아메리카노
                            <SmallText>Iced Americano</SmallText>
                        </TName>
                        <OptionBox name={`ICED | Tall | 일회용컵`} />
                    </TBodyChild>
                </TBody>
                <Center>준비완료</Center>
                <Center>2022.12.08 08:51</Center>
                <Center>4,500 원</Center>
                <Line />
            </>

        </ListWrapper>
    );
}

export default OrderHistroyContainer;