import { Content } from "@components/base";

interface Type {
    height: number
}

function Main ({height}: Type) {
    return (
        <Content height={height}></Content>
    );
}

export default Main;