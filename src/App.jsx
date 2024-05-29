import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ArabicSurah from "./Component/ArabicSurah.jsx";
import List from "./Component/List.jsx";

function App() {

  return (
    <>
        <div className="bg-gray-50">
            <BrowserRouter>
              <Routes>
                     <Route path="/" index element={<List/>}/>
                      <Route path="/surah/:number/:arabic?/:farsi?" element={<ArabicSurah/>}/>

              </Routes>
            </BrowserRouter>
        </div>


    </>
  )
}

export default App
