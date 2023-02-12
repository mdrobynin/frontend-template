import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import { store } from "./common/store";

import { Test } from "./bundles/test-app/containers/Test";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Test />
  </Provider>
);
