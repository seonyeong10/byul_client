import { Content } from "@components/base";
import ItemInfoContainer from "@containers/ItemInfoContainer";
import { useParams } from "react-router-dom";

type MenuInfoType = {
    height: number
}

function MenuInfo({ height }: MenuInfoType) {
    const params = useParams();

    if(!params.itemId) {
        return null;
    }

    return (
        <Content height={height}>
            <ItemInfoContainer />
        </Content>
    );
}

export default MenuInfo;