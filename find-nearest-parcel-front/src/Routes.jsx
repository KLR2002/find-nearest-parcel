import { createBrowserRouter } from 'react-router-dom';
import About from './components/About.jsx'
import Navbar from './components/Navbar.jsx';
import FindParcel from './components/FindParcel.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true, 
        element: <About />,
      },
      {
        path: "find",
        element: <FindParcel/>,
      },
    ],
  },
]);

export default router;