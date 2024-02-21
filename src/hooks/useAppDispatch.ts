import { DispatchApp } from "../config/redux/store";
import { useDispatch } from "react-redux";
export const useAppDispatch: () => DispatchApp = useDispatch;
