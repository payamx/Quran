import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Surah from "./Component/Surah.jsx";
import List from "./Component/List.jsx";
import SharedLayout from "./pages/SharedLayout.jsx";
import Loading from "./Component/Loading.jsx";
import {Suspense, lazy, useState, memo} from "react";
import {Home} from "lucide-react";
import DarkMode from "./Component/DarkMode.jsx";

const Surah = lazy(() => import('./Component/Surah.jsx')); // Lazy load the Surah component

function App() {


    return (
        <>
            <div >
                <BrowserRouter>
                    <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route  path="test" element={<SharedLayout/>}/>
                        <Route element={<SharedLayout/>}>
                            <Route path="/" index element={<List/>}/>
                            <Route path="/surah/:number" element={<Surah/>}/>
                        </Route>
                    </Routes>
                </Suspense>
                </BrowserRouter>
            </div>

        </>
    )
}

export default App
