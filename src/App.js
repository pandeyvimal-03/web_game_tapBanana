import './assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import socket from './actions/socket';
import { createContext } from 'react';

export const SocketContext = createContext();


function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
            <AllRoutes/>
        </BrowserRouter>
       <ToastContainer/>
       </SocketContext.Provider>
    </div>
  );
}

export default App;
