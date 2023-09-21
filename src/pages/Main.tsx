import { Content } from "@components/base";
import CarouselContainer from "@containers/main/CarouselContainer";
import SectionContainer from "@containers/main/SectionContainer";
import SliderSectionContainer from "@containers/main/SliderContainer";

function Main () {

    return (
        <Content>
            {/* <DynamicStyle /> */}
            {/* Carousel */}
            <CarouselContainer />

            {/* 신메뉴 */}
            <SliderSectionContainer title={'새로 나왔어요!'}/>

            {/* 추천메뉴 */}
            <SectionContainer 
                title={'이런 음료는 어때요?'}
                url={"http://localhost:8090/api/v1/menus/advised"}
            />
        </Content>
    );
}

export default Main;