import { Navigate, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default function RequireAdmin(){
    const {data} = useTypedSelector(state=>state.user);
    const rol = data?.rol;
    if(!data || rol !== "admin"){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}