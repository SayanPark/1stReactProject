import React, { Suspense, useContext} from 'react';
import './App.css';
import Toolbar from './containers/header/Toolbar/Toolbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import EditStudent from './pages/EditSTUpage';
import AuthContextProvider from '../src/context/Auth/authContext';
import{ThemeContext} from '../src/context/Theme/themeContext';
import StudentsContextProvider from '../src/context/Students/studentsContext';

const AddStudent = React.lazy(() => import('./pages/AddSTUpage'));

const App = () => {
  const themeContext = useContext(ThemeContext);
  const {lightTheme,light,dark} = themeContext;
  const theme = lightTheme ?light:dark;
  return (
    <BrowserRouter>
      <AuthContextProvider >
        <StudentsContextProvider>   
          <div className="App" style={{background:theme.bg,color:theme.syntax}}>
            <Toolbar />
            <div >
              <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/add-student" exact element={( <Suspense fallback={<p>...loading</p>}><AddStudent /> </Suspense>)}/>
                <Route path="/student/:id" exact element={<EditStudent />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </StudentsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

const NotFound = () => {
  return <h1>Page Not Found</h1>;
};

export default App;
