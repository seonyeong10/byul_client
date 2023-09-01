import { Content } from "@components/base";
import OrderHistroyContainer from "@containers/OrderHistoryContainer";

type Type = {
    height: number
}

function OrderHistory({ height }: Type) {
    return (
        <Content height={height}>
            <OrderHistroyContainer/>
        </Content>
    );
}

export default OrderHistory;