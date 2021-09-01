import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';
import Routes from './Routes';


const App = () => {

    return (
        <>
            <Routes />
            <ToastContainer />
        </>
    );
}

export default App;