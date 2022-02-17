import { configureStore } from "@reduxjs/toolkit";

import roundInfoReducer from "./round-info-slice/reducers";

const store = configureStore({
  reducer: {
    roundInfo: roundInfoReducer,
  },
});

export default store;
