import { Content } from "@components/base";
import ItemListContainer from "@containers/ItemListContainer";

type MenuListType = {
    height: number
}

function MenuList({height}: MenuListType) {

    return (
        <Content height={height}>
            <ItemListContainer />
        </Content>
    );
}

export default MenuList;