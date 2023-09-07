import { Content } from "@components/base";
import ItemInfoContainer from "@containers/ItemInfoContainer";
import { useParams } from "react-router-dom";

function MenuInfo() {
    const params = useParams();

    if(!params.itemId) {
        return null;
    }

    return (
        <Content >
            <ItemInfoContainer />
        </Content>
    );
}

export default MenuInfo;