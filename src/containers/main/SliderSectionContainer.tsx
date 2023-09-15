import { Section } from "@components/div";
import { HeadLine } from "@components/title";
import { axiosHeader } from "@config/axiosConfig";
import { EasyItemType } from "@config/types/ItemType";
import axios from "axios";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSizeCustom from "src/lib/useWindowSizeCusotm";

function SliderSectionContainer({ title = '' }) {
    //== variables ==//
    const [data, setData] = useState<EasyItemType[]>([
        {id: 1, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 2, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 3, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 4, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 5, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 6, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 7, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 8, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
    ]);
    let now = 0;
    const windowSize = useWindowSizeCustom();
    const navigator = useNavigate();

    //== refs ==//
    const contentsRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        axios.get("http://localhost:8090/api/v1/menus/latest", { headers: axiosHeader })
        .then (res => {
            contentsRef.current!.style.width = `${(res.data.length / 4 + 1) * 100}vw`;
            setData(res.data);
        }).catch (err => {
            console.log(err);
        })
    }, []);


    //== functions ==//
    const getFilePath = (id: number | undefined) => {
        if (id !== undefined) 
            return `http://localhost:8090/api/v1/image/${id}`;

        return '/src/assets/test.png';
    }

    const onClickButton = {
        back: () => {
            let move = 0;
            if (now == 0) return;

            if (windowSize <= 800) {
                move = -((90 - 3) / 3 + 1.5) * (--now);
            } else {
                move = -(82 / 4 + 2) * (--now);
            }

            contentsRef.current!.style.transform = `translateX(${move}vw)`;
        },
        next: () => {
            let move = 0;
            let max = data.length;

            if (windowSize <= 800) {
                move = -((90 - 3) / 3 + 1.5) * (++now);
                max -= 3;
            } else {
                move = -(82 / 4 + 2) * (++now);
                max -= 4;
            }

            if (now == max) {
                --now;
                return;
            }

            contentsRef.current!.style.transform = `translateX(${move}vw)`;
        }
    }

    const moveTo = (info: EasyItemType) => {
        const url = `/menus/${info.category.parent?.engName}/${info.category.engName}/${info.id}`;
        navigator(url);
    }

    
    return (
        <Section>
            <HeadLine>{title}</HeadLine>
            <div className="container">
                <div className="section-slider">
                    <button className="previous" onClick={onClickButton.back}></button>
                    <button className="next" onClick={onClickButton.next}></button>
                </div>
                <div className="slide-contents" ref={contentsRef}>
                    {
                        data.map(d => {
                            return (
                                <div className="slide" onClick={() => moveTo(d)}>
                                    <img src={getFilePath(d.attachFileId)} alt={`이달의 신상품-${d.name}`}/>
                                    <p>{d.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Section>
    );
}

export default SliderSectionContainer;