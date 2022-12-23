declare type AppStore = ReturnType<typeof import("./index").createStore>;
declare type AppDispatch = AppStore["dispatch"];
declare type RootState = ReturnType<typeof import("./index").rootReducer>;
