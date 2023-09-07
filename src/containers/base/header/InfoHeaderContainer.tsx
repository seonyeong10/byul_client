import { HeaderIconBtn, HeaderInfoFlex, HeaderInfoWrapper, HeaderSectionTit } from "@components/base/top";
import { IconButton } from "@components/button";
import { SubTitle } from "@components/title";
import { RootState } from "@redux-modules/index";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

function InfoHeaderContainer() {
    const location = useLocation();
    const params = location.pathname.substring(1).split("/");
    const view = useSelector((state: RootState) => state.base.view);
    
    if (params.length < 4) {
        return null;
    }

    return (
        <HeaderInfoWrapper>
            <HeaderIconBtn className="icon left"/>
            <HeaderSectionTit>
                {view.name ?? '이룸'}
                <SubTitle>{view.category ?? '카테고리'}</SubTitle>
            </HeaderSectionTit>
            <HeaderInfoFlex gap={1}>
                <IconButton className="icon heart"/> 
                <IconButton className="icon setting"/> 
            </HeaderInfoFlex>
        </HeaderInfoWrapper>
    );
}

export default InfoHeaderContainer;