import { Section } from "@components/div";
import { HeadLine } from "@components/title";
import { AttachFileType, EasyItemType } from "@config/types/ItemType";

import { useState, useRef } from "react";
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

    //== refs ==//
    const contentsRef = useRef<HTMLDivElement>(null);

    //== functions ==//
    const getFilePath = (files: AttachFileType[] | undefined) => {
        if (files !== undefined) 
            return `http://localhost:8090/api/v1/image/${files[0]!.id}`;

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

            console.log(move);

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

            console.log(move);

            contentsRef.current!.style.transform = `translateX(${move}vw)`;
        }
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
                                <div className="slide">
                                    <img src={getFilePath(d.attachFiles)} alt={`이달의 신상품-${d.name}`}/>
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