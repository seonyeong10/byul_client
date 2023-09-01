import { Center } from "@components/div";
import { PaymentType } from "@config/types/PaymentType";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function SuccessContainer() {

    const path_variable = useParams(); //PathVariable
    const [query_string] = useSearchParams(); //QureyString
    const payment: PaymentType = {
        order_id: window.opener.document.querySelector("#payment-orderId").value,
        pg_token: query_string.get("pg_token") ?? "",
        tid: window.opener.document.querySelector("#payment-tid").value,
    }
    const postUrl = `http://localhost:8090/api/v1/order/${35}/pay/${path_variable.platform}`;

    //== axios ==//
    const axiosHeader = {
        "Content-type": 'application/json;charset=UTF-8'
    };


    console.log('PathVariable', path_variable);
    console.log('QureyString', query_string);
    console.log('payment', payment);

    //POST /api/v1/order/{memberId}/pay/{platform}
    useEffect(() => {
        axios.post(postUrl, payment, {  
            headers: axiosHeader
        }).then(res => {
            console.log(res);
            alert(res.data);
            window.close();
        }).catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <Center>결제가 완료되었습니다.</Center>
    );
}

export default SuccessContainer;