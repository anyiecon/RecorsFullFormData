import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { LayoutCrads } from './Components/Layout/LayoutCards/LayoutCrads';
import { HomeRecord } from "./Components/Page/HomeRecord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomeRecord/>}></Route>
        <Route exact path='/LayoutCards' element={<LayoutCrads/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
