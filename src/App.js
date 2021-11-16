import Home from './paginas/Home';
import { Routes, Route } from 'react-router-dom';
import Adduser from './paginas/Adduser';
import 'bootstrap/dist/css/bootstrap.min.css'
import Edituser from './paginas/Edituser';

function App() {
  return (

    <div style={{maxWidth:"80em", margin:"2rem auto"}}>
      <h1 className="text-center">Tabela de cálculo do IRRF</h1>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/adduser' element={<Adduser />} />
        <Route exact path='/edituser/:id' element={<Edituser />} />
      </Routes>
    </div>

  );
};

export default App;
