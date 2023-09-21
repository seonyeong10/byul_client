import { CustomBtn } from "@components/button";
import { Center, GapFlex } from "@components/section";
import { OptChildWrap, OptionBox } from "@components/section";
import { PeriodPopup } from "@components/popup";
import { Note } from "@components/text";
import { PopupTitle } from "@components/text";

import { useRef, ChangeEvent } from "react";
import colors from "src/styles/Colors";

type PeriodPopupType = {
    open: boolean,
    params: { startDate?: string, endDate?: string },
    search: (from: string, to: string) => void,
    close: () => void
}

function PeriodPopupContainer({ params = {startDate: new Date().toISOString().substring(0, 10), endDate: new Date().toISOString().substring(0, 10)}, search, close }: PeriodPopupType) {
    //== ref ==//
    const periodRefs = useRef<null[] | HTMLInputElement[]>([]);

    //== variable ==//
    const today = new Date();
    const now = today.toISOString().substring(0, 10);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()+1).toISOString().substring(0,10);
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()+1).toISOString().substring(0,10);

    //== function ==//
    /**
     * 기간을 선택한다.
     */
    const onClickRadio = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        
        switch(value) {
            case 'MONTH': {
                search(oneMonthAgo, now);
                return;
            }
            case 'YEAR': {
                search(oneYearAgo, now);
                return;
            }
            default: {
                return;
            }
        }
    }

    /**
     * 날짜를 직접 변경한다.
     */
    const changeDate = {
        start: (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target as HTMLInputElement;

            if(new Date(value) < new Date(oneYearAgo)) {
                alert('최근 1년까지의 이력만 조회 가능합니다.');
                return;
            }
            search(value, (params.endDate ?? now));
        },
        end: (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target as HTMLInputElement;
            search((params.startDate ?? now), value);
        }
    }

    /**
     * 기간 설정을 취소한다.
     */
    const cancel = () => {
        search(now, now);
        close();
    }

    return (
        <PeriodPopup>
            <PopupTitle>기간 설정</PopupTitle>
            <OptionBox name="시작일">
                <OptChildWrap>
                    <input id="period-start" 
                        type="date" 
                        name="startDate" 
                        value={params.startDate ?? now}
                        onChange={(e) => changeDate.start(e)}/>
                </OptChildWrap>
            </OptionBox>
            <OptionBox name="종료일">
                <OptChildWrap>
                    <input id="period-end" 
                        type="date"
                        name="endDate" 
                        value={params.endDate ?? now}
                        onChange={(e) => changeDate.end(e)}/>
                </OptChildWrap>
            </OptionBox>
            <Center>
                <label htmlFor="period-1m">
                    <input id="period-1m" 
                        type="radio" 
                        name="period" 
                        value="MONTH"
                        checked={(params.startDate === oneMonthAgo) && (params.endDate === now)}
                        ref={el => periodRefs.current[0] = el}
                        onChange={(e) => onClickRadio(e)}/> 1개월
                </label>
                <label htmlFor="period-1y">
                    <input id="period-1y" 
                        type="radio" 
                        name="period" 
                        value="YEAR" 
                        checked={(params.startDate === oneYearAgo) && (params.endDate === now)}
                        ref={el => periodRefs.current[1] = el}
                        onChange={(e) => onClickRadio(e)}/> 1년
                </label>
                <label htmlFor="period-custom">
                    <input id="period-custom" 
                        type="radio" 
                        name="period" 
                        value="CUSTOM"
                        checked={(params.startDate !== oneMonthAgo && params.startDate !== oneYearAgo) || (params.endDate !== now)}
                        ref={el => periodRefs.current[2] = el}
                        onChange={(e) => onClickRadio(e)}/> 기간 설정
                </label>
                <Note>
                    최근 1년까지의 이력만 조회 가능합니다.
                </Note>
                <GapFlex gap={2}>
                    <CustomBtn
                        borderColor={colors.blue.deep}
                        color={colors.blue.deep}
                        onClick={() => cancel()}
                    >취소</CustomBtn>
                    <CustomBtn
                        borderColor={colors.blue.deep}
                        background={colors.blue.deep}
                        onClick={close}
                    >완료</CustomBtn>
                </GapFlex>
            </Center>
        </PeriodPopup>
    );
}

export default PeriodPopupContainer;