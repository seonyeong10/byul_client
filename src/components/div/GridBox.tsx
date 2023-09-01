import styled, {css} from "styled-components";
/**
 * Grid 는 기본 4 x 4
 * 모바일에서 3 x 3
 */

//== type ==//
type GridType = {
    gap?: {
        row?: number,
        column?: number,
        all?: number
    },
}

//== style ==//
const Grid = styled.div<GridType>`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, auto));
    align-items: center;

   ${props => {
       if(props.gap?.all) {
            return css`grid-gap: ${props.gap?.all}vw;`;
        } else if(props.gap?.row) {
            console.log(props.gap);
            return css`grid-row-gap: ${props.gap?.row}vw;`;
        } else if(props.gap?.column) {
            return css`grid-column-gap: ${props.gap?.column}vw;`;
        }
    }}

    @media(max-width: 800px) {
        grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), auto));
    }
`;

const GridBox = styled(Grid)`
    grid-auto-rows: minmax(100px, auto);
    text-align: center;

    & > div {
        border-bottom: 1px solid rgba(0,0,0,0.15);
        padding: 1vw 0;
        height: calc(100% - 2vw);
        cursor: pointer;
    }

    img {
        background-color: rgba(0,0,0,1);
        width: 5vw;
        height: 5vw;
        object-fit: contain;
        border-radius: 50px;
    }

    .info {
        grid-column: 1 / span 2;
        
        div {
            width: 100%;
            text-align: left;
        }
    }

    .count {
        justify-content: center !important;
    }
`;

const GridFooter = styled.div`
    grid-column: 1 / span 5;
    padding: 5vw 0 0 !important;
    border: none !important;
    height: auto !important;

    b {
        color: rgba(133, 184, 248, 1);
    }

    button {
        margin-top: 1vw;
    }
`;

export { Grid, GridBox, GridFooter }