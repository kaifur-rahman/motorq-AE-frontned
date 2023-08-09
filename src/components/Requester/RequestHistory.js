import React from "react";
import axios from "axios";
//custom components
import ReqHistoryTable from "./ReqHistoryTable";

function RequestHistory(){
    const uidd=localStorage.getItem('uid');
    const [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        fetchRequests();
    }, [history]);
    
    const fetchRequests = async () => {
        axios.post("http://localhost:4000/request/history", {
            uid: uidd || localStorage.getItem('uid')
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            setHistory(response.data); // Update the state with the fetched data
            console.log(history);
        })
        .catch(error => {
            console.error("Error fetching requests:", error);
        });
    };
    return(
        <>
        <h1>Request History</h1>
        <ReqHistoryTable data={history}></ReqHistoryTable>
        </>
    )
}
export default RequestHistory;