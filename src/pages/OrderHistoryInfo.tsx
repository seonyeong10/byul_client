import { Content } from "@components/base";
import OrderHistoryInfoContainer from "@containers/OrderHistoryInfoConatiner";

type Type = {
    height: number
}

function OrderHistoryInfo({ height }: Type) {
    return (
        <Content height={height}>
            <OrderHistoryInfoContainer height={height} />
        </Content>
    );
}

export default OrderHistoryInfo;