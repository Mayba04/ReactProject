import { Sign } from 'crypto';
import './App.css';
import {Routes, Route} from "react-router-dom"
import SignIn from './pages/auth/sigin';
import SignUp from './pages/auth/signup';
import { useTypedSelector } from "./hooks/useTypedSelector";
import NotFound from "./pages/notFound";
import DashboardLayout from "./conteiner/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import AllUsers from "./pages/users/allUsers";
import AddUsers from "./pages/addUser";
import EditUser from "./pages/editUsers";

function App() {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  
  return (
    <Routes>
       {isAuth && (
        <>
          {user.role === "Administrator" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<AllUsers />} />
              <Route path="addUser" element={<AddUsers/>}/>
               <Route path="editUsers" element={<EditUser />} /> 
            </Route>
          )}
          {user.role === "User" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/users" element={<AllUsers />} />
            </Route>
          )}
        </>
      )}

      <Route path="/" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/dashboard" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}

export default App;
