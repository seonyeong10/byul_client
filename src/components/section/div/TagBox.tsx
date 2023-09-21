import styled, { css } from "styled-components";

interface TagProps {
    season?: boolean,
    picked?: boolean,
    condition: string
}

const TagBox = styled.span<TagProps>`
    font-weight: bold;
    padding: 3px 9px;
    border-radius: 5px;
    
    &:not(:first-child) {
        margin-left: 5px;
    }
    ${props => {
        switch (props.condition) {
            case 'season':
                return css`
                background-color: rgba(180, 215, 254, 0.2);
                color: rgba(133, 184, 248, 1);
            `;
            case 'picked':
                return css`
                background-color: rgba(241, 191, 201, 0.2);
                color: rgba(255, 141, 154, 1);
            `;
            default: return '';
        }
    }}
`;

export { TagBox }