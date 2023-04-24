import Home from "./Page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeList from "./components/ResumeList/ResumeList";
import ResumeDetails from "./components/ResumeDetails/ResumeDetails";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ResumeList" element={<ResumeList />} />
          <Route path="/ResumeList/:id" element={<ResumeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
