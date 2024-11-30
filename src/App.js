import "./App.css";
import AuthRoute from "./Routes/AuthRoute";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Suspense } from "react";
import { Spin } from "antd";
import Test from "./Common/Test";
function App() {
  return (
    <>
      {/* <Test/> */}
      <Suspense fallback={<Spin size="small" />}>
        <AuthRoute />
      </Suspense>
    </>
  );
}

export default App;
