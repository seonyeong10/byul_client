import { Btn, IconButton } from "@components/button";
import { GapFlex, ItemChild, TagBox, ToggleBox } from "@components/section";
import { SectionTitle } from "@components/text";

import reactSvg from "@assets/react.svg";
import { TextSizeR, TextTitle } from "@components/text";
import OrderContainer from "../order/OrderContainer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, reorder } from "src/redux/modules/order";
import { initialize } from "src/redux/modules/menu";
import { RootState } from "src/redux/modules";

// import { MenuType } from "@config/ItemType";
import MenuDetailContainer from "./menu/MenuDetailContainer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ImgBox, InfoBoxChild} from "@components/section";
import { initReorder, initialState } from "@config/types/OrderType";
import { axiosHeader } from "@config/axiosConfig";
import { resetView, setView } from "@redux-modules/base";

import { ItemInfo, ItemWrapper } from "@components/section";



function ItemInfoContainer() {
    //== redux ==//
    const dispatch = useDispatch();
    const menu = useSelector((state: RootState) => state.menu);
    const order = useSelector((state: RootState) => state.order);
    const { memberId } = useSelector((state: RootState) => ({ memberId: state.user.id }));

    //== axios ==//
    const params = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        //데이터를 조회한다.
        const url = `http://localhost:8090/api/v1/${params.dtype}/${params.category1}/${params.category2}/${params.itemId}`;
        axios.get(url, {
            headers: axiosHeader
        })
        .then(res => {
            //메뉴를 초기화 한다.
            //console.log(res.data);

            const _initState = { ...initialState };
            Object.assign(_initState, { count: 1, price: res.data.price, itemId: res.data.id, temp: res.data.temp, additionalCharge: 0 });

            dispatch(initialize({ menu: res.data }));
            dispatch(init(_initState));
            dispatch(setView({ category: res.data.category.name, name: res.data.name }));
        }).catch(err => {
            console.log(err);
            if(err.code === 'ERR_NETWORK') {
                // alert("오류가 발생했습니다.\n관리자에게 문의하세요.");
            }
        });

        //페이지를 벗어날 때 저장소 base.view 초기화
        return () => {
            dispatch(resetView());
        }
    }, [dispatch]);

    /**
     * 주문하기
     */
    const onClickOrder = () => {
        console.log('-----------------------------------');
        console.log('menu', menu);
        console.log('order', order);
        console.log('-----------------------------------');

        if(memberId === null || memberId < 0 || memberId === undefined) {
            alert("로그인 후 이용해주세요.");
            return;
        }

        axios.post(`http://localhost:8090/api/v1/order/${memberId}`, {"orderItems" : [order, order]}, {
            headers: axiosHeader
        })
        .then(res => {
            //주문번호 response
            console.log(res);
            if (res.status == 200) {
                navigator(`/order/${res.data}`);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    /**
     * 장바구니 담기
     */
    const addCart = () => {
        const _initReorder = {...initReorder};
        Object.assign(_initReorder, { count: 1, price: order.price });
        // dispatch(reorder(_initReorder));

        if(memberId === null || memberId < 0 || memberId === undefined) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        
        axios.post(`http://localhost:8090/api/v1/my/${memberId}/cart`, { "orderItems": [order] }, {
            headers: axiosHeader
        }).then(res => {
            console.log(res);
            dispatch(reorder(_initReorder));
            if(res.status === 200) {
                alert("장바구니에 담았습니다.");
            }
        }).catch(err => console.log(err));
    }


    return (
        <GapFlex direction="column" gap={2}>
            <ItemWrapper gap={2}>
                <ImgBox imgSrc={menu.attachFiles.length < 1 ? reactSvg : `http://localhost:8090/api/v1/image/${menu.attachFiles[0].id}`} />
                <ItemInfo direction="column" gap={1}>
                    <ItemChild direction="column" gap={1}>
                        <p>
                            {/* <TagBox condition='picked'>추천</TagBox> */}
                            {/* <TagBox condition='season'>시즌</TagBox> */}
                            { menu.pick === 'Y' ? <TagBox condition='picked'>추천</TagBox> : null }
                            { menu.season === 'Y' ? <TagBox condition='season'>시즌</TagBox> : null }
                        </p>
                        <TextTitle>
                            {menu.name}
                            <span>{menu.engName}</span>
                        </TextTitle>
                        <ToggleBox condition="round">
                            <span className={menu.temp === 'HOT'? 'on' : ''}>HOT</span>
                            <span className={menu.temp === 'ICED'? 'on' : ''}>ICED</span>
                        </ToggleBox>
                        <TextSizeR>{menu.price.toLocaleString('ko-KR')} 원</TextSizeR>
                    </ItemChild>

                    <OrderContainer />

                    <GapFlex gap={1}>
                        <IconButton className="icon heart"></IconButton>
                        <IconButton className="icon cart" onClick={() => addCart()}></IconButton>
                        <Btn onClick={() => onClickOrder()}>주문하기</Btn>
                    </GapFlex>
                </ItemInfo>
            </ItemWrapper>

            <ItemWrapper direction="column" gap={0.5}>
                <GapFlex gap={1}>
                    <SectionTitle>판매 오픈</SectionTitle>
                    {/* 2023.08.04 19:30 */}
                    {new Date(menu?.startDate).toLocaleString("ko-KR", { dateStyle: "long", timeStyle: "short" })}
                </GapFlex>
                <GapFlex gap={1}>
                    <SectionTitle>판매 종료</SectionTitle>
                    {/* 2023.08.04 19:30 */}
                    {menu.endDate ? new Date(menu?.endDate).toLocaleString("ko-KR", { dateStyle: "long", timeStyle: "short" }) : '상시판매'}
                </GapFlex>
            </ItemWrapper>

            <ItemWrapper direction="column" gap={2}>
                <ItemInfo direction="column" gap={1}>
                    <SectionTitle>상품 정보</SectionTitle>
                    {menu.etc}
                </ItemInfo>
                {/* <GapFlex gap={1}>
                    <SectionTitle>알러지 유발 물질</SectionTitle>
                    복숭아, 대두
                </GapFlex> */}
                <MenuDetailContainer />
            </ItemWrapper>
        </GapFlex>
    );
}

export default ItemInfoContainer;