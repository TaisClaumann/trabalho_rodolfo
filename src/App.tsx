import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import CadastroUsuario from "./Paginas/CadastroUsuario/CadastroUsuario";
import Home from './Paginas/Home/Home'
import Share from './Paginas/Share/Share'
import SharesPage from "./Paginas/ShareList/ShareList";


const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/share" element={<Share/>}/>
        <Route path="/shareList" element={<SharesPage/>}/>
        <Route path="/CadastroUsuarios" element={<CadastroUsuario/>}/>
      </Routes>
    </Router>
  );
}

export default App
