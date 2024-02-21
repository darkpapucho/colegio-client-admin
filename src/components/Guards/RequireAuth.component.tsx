import { Navigate, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default function RequireAuth(){
    const {data} = useTypedSelector(state=>state.user);
    if(data) return <Outlet/>
    return <Navigate to="/"/>
}