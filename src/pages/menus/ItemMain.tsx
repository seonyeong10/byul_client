import { Content } from "@components/base";
import SectionContainer from "@containers/main/SectionContainer";

function ItemMain() {
    return (
        <Content>
            <SectionContainer 
                title={"음료"}
                url={"http://localhost:8090/api/v1/menus/home/drink"}
            />

            <SectionContainer 
                title={"푸드"}
                url={"http://localhost:8090/api/v1/menus/home/food"}
            />

            {/*<SectionContainer 
                title={"상품"}
                url={"http://localhost:8090/api/items/g"}
            /> */}
        </Content>
    );
}

export default ItemMain;