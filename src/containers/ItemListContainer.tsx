import { ListBody, ListHeader, ListWrapper } from '@components/list';

import { useDispatch } from 'react-redux';
import PagingContainer from './PagingContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryType } from '@config/types/ItemType';
import { SectionTitle } from '@components/title';
import { Flex } from '@components/div';
import { Anchor } from '@components/button';

import reactSvg from '@assets/react.svg';

type ListType = {
    id: number,
    name: string,
    attachFileId: number,
    category: CategoryType 
}

type PageType = {
    content: Array<ListType>,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number
}

function ItemListContainer() {
    //== redux ==//
    const dispatch = useDispatch();
    const params = useParams();
    const navigator = useNavigate();

    //== parameters ==//
    const baseurl = `http://localhost:8090/api/v1/${params.dtype}`;
    const url = () => {
        let result = baseurl;
        if(Object.keys(params).includes("category1")) {
            result += `/${params.category1}`;            
        }
        if(Object.keys(params).includes("category2")) {
            result += `/${params.category2}`;            
        }
        return result;
    }
    const axiosHeader = {
        "Content-type": 'application/json;charset=UTF-8'
    };

    //== state ==//
    const [search, setSearch] = useState({
        page: 0,
        sort: 'default',
    });
    const [finds, setFinds] = useState<PageType>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 0,
        number: 0
    });
    
    //== rendering ==//
    useEffect(() => {

        axios.get(url(), {
            params: search,
            headers: axiosHeader
        })
        .then(res => {
            console.log(res.data);
            setFinds({
                content: res.data.content,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,
                size: res.data.sies,
                number: res.data.number
            });
        }).catch(err => {
            console.log(err);
        });

    }, [dispatch, search]);

    //== function ==//
    /**
     * 항목을 선택하면 상세 페이지로 이동한다.
     * @param id 
     */
    const onClickListContent = (path: string) => {
        navigator(path);
    }

    /**
     * 정렬 버튼 클릭(기본/인기순/최신순)
     */
    const onClickOrder = (sort: string) => {
        console.log('sort', sort);
        setSearch({ ...search, sort: sort });
    }

    
    return (
        <ListWrapper gap={{all: 2}} >
            <ListHeader padding={{bottom: 0.8}}>
                <SectionTitle>0개의 메뉴</SectionTitle>
                <Flex>
                    <Anchor condition="select" onClick={() => onClickOrder('default')}>기본순</Anchor>
                    <Anchor condition="delemiter" onClick={() => onClickOrder('newest')}>최신순</Anchor>
                    <Anchor condition="delemiter" onClick={() => onClickOrder('popularity')}>인기순</Anchor>
                </Flex>
            </ListHeader>
            
            <ListBody key="key1" imgSrc={reactSvg} name="아이스 아메리카노" path="/menus/drink/espresso/0" onClick={onClickListContent} />
            {
                (finds.content.length > 0)
                && finds.content?.map(item =>
                    <ListBody
                        key={`${item.id}|${item.name}`}
                        path={`/${params.dtype}/${item.category.parent?.engName}/${item.category.engName}/${item.id}`}
                        name={item.name}
                        imgSrc={`http://localhost:8090/api/v1/image/${item.attachFileId}`}
                        onClick={onClickListContent} />
                )
            }

            <PagingContainer elements={finds.totalElements} total={finds.totalPages} page={finds.number + 1}/>
        </ListWrapper>
    );
}

export default ItemListContainer;