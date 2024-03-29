import { Carousel } from "@components/section";
import { Slider } from "@components/section/slider/Slider";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function CarouselContainer () {
    //== refs ==//
    const carouselRef = useRef<HTMLDivElement>(null);

    //== variables ==//
    const images = [
        '/src/assets/carousel/IMG_2754.JPG',
        "/src/assets/carousel/IMG_2756.JPG",
        "/src/assets/carousel/IMG_2757.JPG"
    ];
    let now = 0;
    const max = images.length - 1;

    useEffect(() => {
        onClickButton.move(now);
    }, []);

    //== functions ==//
    const onClickButton = {
        back : () => {
            if (now === 0) return;
            let move = -100 * (--now);
            carouselRef.current!.style.transform = `translateX(${move}vw)`;
        },
        next : () => {
            if (now === max) return;
            let move = -100 * (++now);
            carouselRef.current!.style.transform = `translateX(${move}vw)`;
        },
        move : (num: number) => {
            now = num;
            let move = num * -100;
            carouselRef.current!.style.transform = `translateX(${move}vw)`;
        }
    }

    return (
        <div style={{position: 'relative'}}>
            <Carousel ref={carouselRef}>
                <div className="container" ref={carouselRef}>
                    {
                        images.map(i => {
                            return (
                                <div className="inner">
                                    <img src={i}/>
                                </div>
                            )
                        })
                    }
                </div>
            </Carousel>
            <Slider>
                <div className="previous-next-container">
                    <Link to="#" className="previous-carousel" onClick={() => onClickButton.back()}/>
                    <Link to="#" className="next-carousel" onClick={() => onClickButton.next()}/>
                </div>
                <div className="slider-container">
                    {
                        images.map((i, idx) => {
                            return <Link to="#" onClick={() => onClickButton.move(idx)}/>
                        })
                    }
                </div>
            </Slider>
        </div>
    );
}

export default CarouselContainer;