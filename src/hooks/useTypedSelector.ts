import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../config/redux/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
