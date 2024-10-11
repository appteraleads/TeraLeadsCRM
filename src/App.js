import './App.css';
import CRMRoute from './Routes/CRMRoute';
import Layout from './Layout';
import firebaseConfig from './Config/firebaseConfig';
function App() {
  return (
    <>
    {/* <Layout/> */}
      <CRMRoute/>
    </>
  );
}

export default App;