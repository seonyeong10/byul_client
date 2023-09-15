import HeaderContainer from "@containers/base/HeaderContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./Auth";
import MenuList from "./MenuList";
import MenuInfo from "./MenuInfo";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import OrderHistoryInfo from "./OrderHistoryInfo";

import { useDispatch } from "react-redux"; 
import AuthCallback from "./AuthCallback";
import { useEffect } from "react";
import axios from "axios";
import { saveLocalStorage, toUserType } from "src/lib/loginAction";
import { init } from "@redux-modules/user";
import Logout from "./Logout";
import OrderPay from "./OrderPay";
import Success from "./pay/Success";
import Main from "./Main";
import ItemMain from "./menus/ItemMain";


function AppRouter() {
    //const headerHeight = useSelector((state: RootState) => state.base.header.height);
    const dispatch = useDispatch();

    useEffect(() => {
        /**
         * 페이지가 새로고침되면 토큰을 재발급한다.
        */
       if (localStorage.length == 0) {
            return;
       }

       console.log(localStorage);

       axios.post("http://localhost:8090/api/v1/login/reissue", {
           "accessToken": localStorage.getItem("accessToken"),
           "refreshToken": localStorage.getItem("refreshToken")
       }).then(res => {
           // console.log(res);
           const member = toUserType(res.data);
           saveLocalStorage(member);
           dispatch(init(member));
       }).catch(err => {
           console.log(err);
       });
    }, []);

    return (
        <BrowserRouter>
            <HeaderContainer />

            <Routes>
                <Route path="/login">
                    <Route path="" element={<Auth />} />
                    <Route path=":platform/callback" element={<AuthCallback />} />
                </Route>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/my">
                    <Route path=":memberId/cart" element={<Cart />}/>
                    <Route path=":memberId/history" element={<OrderHistory />}/>
                    <Route path=":memberId/history/:orderId" element={<OrderHistoryInfo />}/>
                </Route>
                <Route path="/order">
                    <Route path="pay/:platform/success" element={<Success />}/>
                    <Route path=":orderId" element={<OrderPay />}/>
                </Route>
                <Route path="/:dtype" >
                    {/* <Route path="" element={<MenuList />}/> */}
                    <Route path="" element={<ItemMain />}/>
                    <Route path=":category1" element={<MenuList />}/>
                    <Route path=":category1/:category2" element={<MenuList />}/>
                    <Route path=":category1/:category2/:itemId" element={<MenuInfo />}/>
                </Route>
                <Route path="/" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;