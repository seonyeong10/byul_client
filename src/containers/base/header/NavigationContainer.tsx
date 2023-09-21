import { Navigation } from "@components/base";
import { AnchorBackground, AnchorBottomLine } from "@components/button";
import { CategoryType } from "@config/types/ItemType";

import { forwardRef } from "react";
import { useLocation } from "react-router-dom";

type NavigationContainerType = {
    categories?: Array<CategoryType>,
    onClick?: (index: number) => void
}

function defaultFC() {
    alert('오류가 발생했습니다.\n관리자에게 문의하세요.');
}

const SubNavagationContainer = forwardRef<HTMLDivElement, NavigationContainerType>(({ categories = [] }, ref) => {
    const params = useLocation().pathname.substring(1).split("/");

    if(categories.length === 0) {
        return null;
    }

    return (
        <Navigation
            condition="sub"
            ref={ref}
        >
            <AnchorBackground
                to={`/${params[0]}/${params[1]}`}
                condition={params.length === 2 ? 'select' : ''}
            >
                전체
            </AnchorBackground>
            {
                categories?.map(ctg => 
                    <AnchorBackground
                        key={`nav|${ctg.engName}`}
                        to={`/${params[0]}/${params[1]}/${ctg.engName}`}
                        condition={params.includes(ctg.engName ?? 'undefinded') ? 'select' : ''}
                    >
                        {ctg.name}
                    </AnchorBackground>
                )
            }
        </Navigation>
    );
});

const NavigationContainer = ({ categories, onClick = defaultFC }: NavigationContainerType) => {
    const params = useLocation().pathname.substring(1).split("/");

    return (
        <Navigation>
            <AnchorBottomLine
                to={`/${params[0]}`}
                condition={params.length === 1 ? 'select' : ''}
                onClick={() => onClick(0)}
            >
                홈
            </AnchorBottomLine>
            {
                categories?.map(ctg =>
                    <AnchorBottomLine
                        key={`nav|${ctg.engName}`}
                        to={`/${params[0]}/${ctg.engName}`}
                        condition={params.includes(ctg.engName ?? 'undefinded') ? 'select' : ''}
                        onClick={() => onClick(ctg.id)}
                    >
                        {ctg.name}
                    </AnchorBottomLine>
                )
            }
        </Navigation>
    );
};

export { NavigationContainer, SubNavagationContainer };