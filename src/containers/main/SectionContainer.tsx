import { Section } from "@components/div";
import { HeadLine } from "@components/title";
import { AttachFileType, EasyItemType } from "@config/types/ItemType";

import { useState, useEffect } from "react";
import useWindowSizeCustom from "src/lib/useWindowSizeCusotm";

function SectionContainer({ title = '' }) {
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
        {id: 9, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 10, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 11, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
    ]);
    const windowSize = useWindowSizeCustom();
    const [html, addHtml] = useState("<div class='item'><img src='/src/assets/test.png'/><p>테스트카노</p></div>");
    const rimit = windowSize <= 800 ? 6 : 10;
    let now = 0;

    useEffect(() => {
        console.log("랜더링");
        const _html = showItems.init.map(d => `<div class='item'><img src='${getFilePath(d.attachFiles)}'/><p>${d.name}</p></div>`);
        addHtml(_html.join(""));
    }, [windowSize]);

    //== functions ==//
    const getFilePath = (files: AttachFileType[] | undefined) => {
        if (files !== undefined) 
            return `http://localhost:8090/api/v1/image/${files[0]!.id}`;

        return '/src/assets/test.png';
    }

    //더 보여줄 데이터 범위 결정하기
    const showItems = {
        init: data.filter((d, idx) => idx < rimit),
        next: (n: number) => {
            const start = n*rimit;
            const end = ++n * rimit;
            return data.filter((d, idx) => idx >= start && idx < end);
        }
    };

    //상품 더 보여주기
    const viewMore = (n: number) => {
        if (n * rimit >= data.length) return;

        const add = showItems.next(n).map(d => 
            `<div class='item'><img src='${getFilePath(d.attachFiles)}'/><p>${d.name}</p></div>`).join("");

        addHtml(html + add);
    }

    return (
        <Section>
            <HeadLine>{title}</HeadLine>
            <div className="container">
                <div className="contents" dangerouslySetInnerHTML={{ __html: html }} >
                    {/*
                        data.map(d => {
                            return (
                                <div className="item">
                                    <img src={getFilePath(d.attachFiles)} alt={`추천 상품-${d.name}`}/>
                                    <p>{d.name}</p>
                                </div>
                            )
                        })
                    */}                    
                </div>
                <button className="view-more" onClick={() => viewMore(++now)}>더보기</button>
            </div>
        </Section>
    );
}

export default SectionContainer;