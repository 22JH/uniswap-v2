import App from "./App";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </QueryClientProvider>
);
