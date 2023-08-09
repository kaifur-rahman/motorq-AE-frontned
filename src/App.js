import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
//components
import Login from "./components/login/loginContainer";
import Admin from "./components/Admin/HomeAdmin";
//after logging in to admin 
import Audit from "./components/Admin/audit";
import Dashboard from "./components/Admin/dashboard";
import Workflow from "./components/Admin/workflow";

import Requester from "./components/Requester/HomeRequester";
//after logging in to approver 
import Approver from "./components/Approver/HomeApprover";
import ApproverDashboard from "./components/Approver/dashboard";

//after loggin in to requester
import ApplyRequest from "./components/Requester/ApplyRequest";
import RequestHistory from "./components/Requester/RequestHistory";

function App() {
  //check user atq to that send menu item

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}/>
        {/*protected routes homepage after login*/}
        <Route path="/auth/admin" element={<Admin content={<Workflow></Workflow>}></Admin>}/>
        <Route path="/auth/requester" element={<Requester content={<ApplyRequest></ApplyRequest>}></Requester>}/>
        <Route path="/auth/approver" element={<Approver content={<ApproverDashboard></ApproverDashboard>}></Approver>}/>
        {/*Admin after login*/}
        <Route path="/auth/admin/dashboard" element={<Admin content={<Dashboard></Dashboard>}></Admin>}/>
        <Route path="/auth/admin/audit" element={<Admin content={<Audit></Audit>}></Admin>}/>

        {/*Approver after login only 1 route*/}
       
        {/*Requester after login*/}
        <Route path="/auth/requester/apply" element={<Requester content={<ApplyRequest></ApplyRequest>}></Requester>}/>
        <Route path="/auth/requester/history" element={<Requester content={<RequestHistory></RequestHistory>}></Requester>}/>

      </Routes>
    </Router>
  );
}
export default App;
