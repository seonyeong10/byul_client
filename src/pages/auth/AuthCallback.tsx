import { useDispatch } from "react-redux";
import { setHeaderVisible } from "@redux-modules/base";
import { useEffect } from "react";
import AuthCallbackContainer from "@containers/auth/AuthCallbackContainer";

function AuthCallback() {
    const dispatch = useDispatch();

    useEffect(() => {
        //페이지에 들어오면 헤더 비활성화
        dispatch(setHeaderVisible({ visible: false }));
        return () => {
            //페이지에서 벗어나면 헤더 활성화
            dispatch(setHeaderVisible({ visible: true }));
        }
    }, [dispatch]);

    return <AuthCallbackContainer />;
}

export default AuthCallback;