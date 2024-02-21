import { Navigate, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default function RequireProfesor(){
    const {data} = useTypedSelector(state=>state.user);
    const rol = data?.rol;
    if(!data || rol!=="profesor"){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}