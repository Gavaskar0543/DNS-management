import HomePage from "../Pages/HomePage";
import SigninComponent from "./AuthComponents/SigninComponent";
import SignupComponent from "./AuthComponents/SignupComponent";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import DnsRecordDashboard from "./DnsRecordDashboard";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
function App() {
 
  const router = createBrowserRouter([{
    path:'/',
    element:<SignupComponent/>
  },
 {
  path:'/signin',
  element:<SigninComponent/>
 },
 {path:'/Home',
element:<HomePage/>},
{
  path:'/dnsrecord',
  element:<DnsRecordDashboard/>
}
])
  return (
    <div className="App">
      <div>
       <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
