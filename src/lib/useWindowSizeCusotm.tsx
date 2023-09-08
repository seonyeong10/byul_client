import { useState, useEffect } from "react";

/**
 * 현재 브라우저의 크기(넓이) 반환하기
 * @returns 브라우저 넓이(width)
 */
const useWindowSizeCustom = () => {
    const [windowSize, setWindowSize] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize(window.document.body.offsetWidth);
            }

            //resize 이벤트가 발생할 때 handleResize 함수 실행
            window.addEventListener("resize", handleResize);

            //초기값 설정
            handleResize();

            //이벤트 리스너를 제거하여 반복 실행 방지
            return () => window.removeEventListener("resize", handleResize);
        } else {
            return () => window.removeEventListener("resize", () => { return null; });
        }
    }, []);

    return windowSize;
}

export default useWindowSizeCustom;