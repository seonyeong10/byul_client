import { Grid } from "@components/div";
import styled from "styled-components";

//== type ==//

//== style ==//
const ListWrapper = styled(Grid)`
    //grid-template-columns: repeat(auto-fill, calc(20%));
    grid-template-columns: repeat(auto-fill, calc((100% - 8vw) / 5));
    margin-top: 5vw;

    & > h3 {
        margin-bottom: 2rem;
    }

    @media(max-width: 800px) {
        grid-template-columns: repeat(auto-fill, calc((100% - 8vw) / 3));
        //3번째 child 이후 표시 안함
        & > div:nth-of-type(n+4) {
            //display: none;
        }
    }
`;

export { ListWrapper }