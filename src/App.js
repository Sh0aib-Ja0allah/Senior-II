import { Route, Routes } from "react-router-dom"
import './App.css';
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Login from "./Components/Login/Login.jsx";
import AddPatient from "./Components/Patients/AddPatient.jsx"
import PatientsList from "./Components/Patients/PatientsList.jsx"
import AddUser from "./Components/Users/AddUser.jsx"
import UsersList from "./Components/Users/UsersList.jsx"
import NavBar from "./Components/NavBar/NavBar.jsx"

function App() {
  return (
    <div className="App">
      <NavBar />
      <hr/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="add-patient" element={<AddPatient />} />
        <Route path="patients-list" element={<PatientsList />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="users-list" element={<UsersList />} />
      </Routes>
    </div>
  );
}

export default App;

// Install react router:
// npm install --save-dev react-router-dom

// install Material UI:
// npm install @mui/material @emotion/react @emotion/styled

// install Material UI Icons:
// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

// install axios package:
// npm i axios

//install firebase package:
// npm install firebase

// install uid package:
// npm install uid
