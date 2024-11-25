import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Surah from "./Component/Surah.jsx";
import List from "./Component/List.jsx";
import SharedLayout from "./pages/SharedLayout.jsx";
import Loading from "./Component/Loading.jsx";

function App() {

  return (
    <>

        <div className=" dark:bg-gray-700 h-full">
            <BrowserRouter>
                <Routes>

                    <Route  element={<SharedLayout/>}>
                        <Route path="/" index  element={<List/>}/>
                        <Route path="/surah/:number" element={<Surah/>} />
                    </Route>

              </Routes>
            </BrowserRouter>
        </div>


    </>
  )
}

export default App
