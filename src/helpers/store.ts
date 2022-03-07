import type { RootState, AppDispatch } from "store";
import {
	useSelector as useReduxSelector,
	useDispatch as useReduxDispach,
	TypedUseSelectorHook,
} from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispach<AppDispatch>();
