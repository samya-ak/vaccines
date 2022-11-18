import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import AuthForm from "./components/authForm";
import Vaccines from "./components/vaccines/list";
import VaccineForm from "./components/vaccines/form";

function NotFound() {
  return (
    <div className="d-flex justify-content-center mt-5 text-muted">
      <h4>404, You're lost  :(</h4>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<AuthForm type="signup" />} />
          <Route path="signin" element={<AuthForm type="signin" />} />
          <Route path="vaccines" element={<Vaccines />} />
          <Route path="vaccines/create" element={<VaccineForm type="create" />} />
          <Route path="vaccines/:id/edit" element={<VaccineForm type="edit" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
