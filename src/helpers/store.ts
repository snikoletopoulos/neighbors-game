import type { RootState, AppDispatch } from "types/store.types";
import {
	useSelector as useReduxSelector,
	useDispatch as useReduxDispach,
	TypedUseSelectorHook,
} from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispach<AppDispatch>();
