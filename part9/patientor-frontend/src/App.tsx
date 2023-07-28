import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import PatientListPage from "./components/PatientListPage";
import { getAllPatients } from "./services/patients";
import { PatientDetail } from "./components/PatientDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { getDiagnosis } from "./services/diagnosis";

export const DiagContext = createContext<{name:string,code:string}[]>([])

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnos,setDiagnos] = useState([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const data = await getAllPatients()
      setPatients(data)
    };

    const fetchDiagnosis = async () => {
      const data = await getDiagnosis()
      console.log({diagnosis:data})
      setDiagnos(data)
    }

    void fetchPatientList()
    void fetchDiagnosis()

  }, []);
  return (
    <DiagContext.Provider value={diagnos}>
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          </Routes>
          <Routes>
            <Route path="/patient/:id" element={<PatientDetail/>} />
          </Routes>
        </Container>
      </Router>
      </LocalizationProvider>
    </div>
    </DiagContext.Provider>
  );
};

export default App;
