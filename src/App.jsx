import { BrowserRouter, Outlet } from "react-router-dom"
import MainPage from "./LoginPage/MainPage"
import { Routes,Route } from "react-router-dom"
import LoginPage from "./LoginPage/LoginPage"
import NavBar from "./components/NavBar"
import DetailPage from "./pages/DetailPage"

const Layout = () => {
  return(
    <>
      <NavBar/>
      <br />
      <br />
      <br />
      <Outlet/> 
    </>
  )
}
// path 에 지정한 경로페이지가 Outlet 에 매핑이 됨 
const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>} />
          <Route path="login" element={LoginPage}/>
         <Route path="/pokemon/:id" element={<DetailPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
  export default App
  
