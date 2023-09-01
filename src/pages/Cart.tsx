import { Content } from "@components/base";
import CartContainer from "@containers/CartContainer";

type Type = {
    height: number
}

function Cart({ height }: Type) {
    return (
        <Content height={height}>
            <CartContainer />
        </Content>
    );
}

export default Cart;