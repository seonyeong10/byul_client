import { Section } from "@components/div";
import { HeadLine } from "@components/title";
import { axiosHeader } from "@config/axiosConfig";
import { EasyItemType } from "@config/types/ItemType";
import axios from "axios";

import { useState, useEffect } from "react";
import useWindowSizeCustom from "src/lib/useWindowSizeCusotm";

function SectionContainer({ title = '', url = '' }) {
    //== variables ==//
    const [data, setData] = useState<EasyItemType[]>([
        {id: 1, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 2, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 3, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 4, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' },
        {id: 5, category: {id: 2, name: '에스프레소', engName: 'espresso', parent: { id: 1, name: '음료', engName: 'drinks', children: [] }, children: []}, name: '아이스 아메리카노' }
    ]);
    const windowSize = useWindowSizeCustom();
    const [html, addHtml] = useState("<div class='item'><img src='/src/assets/test.png'/><p>테스트카노</p></div>");
    const limit = windowSize <= 800 ? 6 : 10;
    let now = 0;

    useEffect(() => {
        console.log("랜더링");
        //showItems.init(data);

        axios.get(url, { params: { limit: limit*2 },  headers: axiosHeader })
        .then(res => {
            //console.log(res.data);
            setData(res.data);
            showItems.init(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [windowSize]);

    //== functions ==//
    const getFilePath = (id: number | undefined) => {
        if (id !== undefined) 
            return `http://localhost:8090/api/v1/image/${id}`;

        return '/src/assets/test.png';
    }

    //더 보여줄 데이터 범위 결정하기
    const showItems = {
        init: (list: EasyItemType[]) => {
            const _html = list.filter((d, idx) => idx < limit).map(d => `<div class='item'><img src='${getFilePath(d.attachFileId)}'/><p>${d.name}</p></div>`);
            addHtml(_html.join(""));
        },
        next: (n: number) => {
            const start = n*limit;
            const end = ++n * limit;
            return data.filter((d, idx) => idx >= start && idx < end);
        }
    };

    //상품 더 보여주기
    const viewMore = (n: number) => {
        if (n * limit >= data.length) return;

        const add = showItems.next(n).map(d => 
            `<div class='item'><img src='${getFilePath(d.attachFileId)}'/><p>${d.name}</p></div>`).join("");

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
                                    <img src={getFilePath(d.attachFiles)} alt={`${d.name}`}/>
                                    <p>{d.name}</p>
                                </div>
                            )
                        })
                    */}                    
                </div>
                {
                    data.length > limit && <button className="view-more" onClick={() => viewMore(++now)}>더보기</button>
                }
            </div>
        </Section>
    );
}

export default SectionContainer;