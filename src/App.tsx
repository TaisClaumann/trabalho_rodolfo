import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import CadastroUsuario from "./Paginas/CadastroUsuario/CadastroUsuario";
import Home from './Paginas/Home/Home'
import Share from './Paginas/Share/Share'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                      
import 'primeflex/primeflex.css';                         


const App = () => {
  return(
    <PrimeReactProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/share" element={<Share/>}/>
        <Route path="/CadastroUsuarios" element={<CadastroUsuario/>}/>
      </Routes>
    </Router>
    </PrimeReactProvider>
  );
}

export default App
