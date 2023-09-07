import { Content } from "@components/base";
import CarouselContainer from "@containers/main/CarouselContainer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Slider = styled.div`
    .container a.showSlide {
        display: inline-block;
        padding: 1rem 2rem;
        background-image: url('http://localhost:5173/src/assets/icons/line_d.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        &:not(:first-child) {
            margin-left: 1vw;
        }
    }
`;

function Main () {

    return (
        <Content>
            {/* Carousel */}
            <CarouselContainer />

            <Slider>

                <div className="container">
                    <Link to={"#"} className="showSlide" />
                    <Link to={"#"} className="showSlide" />
                </div>
            </Slider>
        </Content>
    );
}

export default Main;