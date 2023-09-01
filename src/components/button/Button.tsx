import styled from "styled-components";

const Button = styled.button`
    background-color: rgba(0, 0, 0, 1);
    border: 1px solid rgba(0,0,0,1);
    color: #ffffff;
    padding: 10px;
    cursor: pointer;
    border-radius: 3px;
    width: 100%;
    cursor:pointer;
`;

const LinedButton = styled(Button)`
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,1);
    border-raduis: 5px;
    color: rgba(0,0,0,1);
`;

const ColorButton = styled(Button)`
    background-color: #00264B;
    border: 1px solid #00264B;
`;

const ColorLinedButton = styled(LinedButton)`
    border: 1px solid #00264B;
    color: #00264B;
`;

const CircleBtn = styled(Button)`
    background-color: #ffffff;
    color: rgba(0,0,0,1);
    border-radius: 50px;
    width: 1.3rem;
    height: 1.3rem;
    font-size: 17px;
    padding: 0;
    margin: 0px 10px;

    &:last-child {
        margin-right: 0;
    }

    &.inactivated {
        border-color: rgba(0,0,0,0.3);
    }
`;

const LoginButton = styled.button`
    display: flex;
    align-items: center;
    gap: 1vw;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.15);
    padding: 0px 15px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;

    img {
        width: 46px;
        height: 46px;
    }
`;

export { Button, CircleBtn, LoginButton, LinedButton, ColorButton, ColorLinedButton }