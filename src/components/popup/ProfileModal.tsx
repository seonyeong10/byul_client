import styled from "styled-components";
import { ReactNode, forwardRef } from "react";
import colors from "src/styles/Colors";

interface ModalMenuType {
    children?: ReactNode
}

const CustomModal = styled.div`
    &:not(:first-child) {
        padding-top: 1rem;
    }

    &:not(:last-child) {
        padding-bottom: 1rem;
        border-bottom: 1px solid ${colors.grey.accent};
    }

    img {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: middle;
        margin-right: 5px;
    }

    a {
        display: block;
        &:not(:first-child, :last-child) {
            padding: 10px 0;
        }
    }

    a.drop {
        float: right;
        vertical-align: middle;
        padding: .8rem;
        background-image: url('http://localhost:5173/src/assets/icons/chevron-down.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-left: 1rem;
    }
`;

const ModalMenu = forwardRef<HTMLDivElement, ModalMenuType>(({ children }, ref) => {
    return (
        <CustomModal ref={ref}>
            {children}
        </CustomModal>
    );
});


export { ModalMenu };