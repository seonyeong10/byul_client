import { Content } from "@components/base";
import ItemListContainer from "@containers/ItemListContainer";

import { useSelector } from 'react-redux';
import { RootState } from "src/redux/modules";


type MenuListType = {
    height: number
}

function MenuList({height}: MenuListType) {
    const base = useSelector((state: RootState) => state.base.view);

    if(!(base.step === 1 && base.dtype === 'M')) {
        return null;
    }

    return (
        <Content height={height}>
            <ItemListContainer />
        </Content>
    );
}

export default MenuList;