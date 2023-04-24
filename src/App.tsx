import Home from "./Page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeList from "./components/ResumeList/ResumeList";
import ResumeDetails from "./components/ResumeDetails/ResumeDetails";
import { AppProvider } from "./context";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="resumeList" element={<ResumeList />} />
            <Route path="/resumeList/:id" element={<ResumeDetails />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
