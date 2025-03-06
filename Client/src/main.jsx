import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import { Store,Persiststore } from './AuthState/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import "./index.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from "./Pages/Home.jsx";
import Files from "./Pages/Files.jsx";
import Profile from "./Pages/Profile.jsx";
import Signup from "./Pages/Signup.jsx";
import Recieved from './Pages/Recfiles.jsx';
import Setting from './Pages/Setting.jsx';
import Upload from './Pages/Upload.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/signup",
            element: (
                <Signup />
            ),
        },
        {
            path: "/profile",
            element: (
                <Profile />
            ),
        },
        {
            path: "/files",
            element: (
                <Files />
            ),
        },
        {
          path: "/recieved",
          element:(
            <Recieved />
          ),
        },
        {
          path: "/setting",
          element:(
            <Setting />
          )
        },
        {
          path:"/upload",
          element:(
          <Upload />
          )
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persiststore}>
        <MantineProvider>
        <RouterProvider router={router}/>
        </MantineProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
