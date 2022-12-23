declare type AppStore = ReturnType<typeof import("./index").createStore>;
declare type AppDispatch = AppStore["dispatch"];
