import { axiosHeader } from "@config/axiosConfig";
import { PaymentType } from "@config/types/PaymentType";
import { RootState } from "@redux-modules/index";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";


function SuccessContainer() {

    const path_variable = useParams(); //PathVariable
    const [query_string] = useSearchParams(); //QureyString
    const message = window.opener.receiveMessage();
    const payment: PaymentType = {
        order_id: message.order_id,
        pg_token: query_string.get("pg_token") ?? "",
        tid: message.tid
    }
    const userId = useSelector((state: RootState) => state.user.id);
    const postUrl = `http://localhost:8090/api/v1/order/${userId}/pay/${path_variable.platform}`;

    
    console.log(userId, payment);

    window.opener.parentCallback('success');

    //POST /api/v1/order/{memberId}/pay/{platform}
    useEffect(() => {
        axios.post(postUrl, payment, {  
            headers: axiosHeader
        }).then(res => {
            //console.log(res);
            if (res.status === 200) {
                window.opener.parentCallback('success');
            } else {
                window.opener.parentCallback('fail');
            }
            window.close();
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return <></>;
}

export default SuccessContainer;