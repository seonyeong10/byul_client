import { Content } from "@components/base";
import OrderPayContainer from "@containers/OrderPayContainer";
import { RootState } from "@redux-modules/index";
import { useSelector } from "react-redux";

function OrderPay() {
    //== redux ==//
    const contentHeight = useSelector((state: RootState) => state.base.header.height);
    
    return (
        <Content height={contentHeight}>
            <OrderPayContainer />
        </Content>
    );
}

export default OrderPay;