import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehiclesList from "../pages/VehiclesList";
import VehicleDetail from "../pages/VehicleDetail";
import VehicleForm from "../pages/VehicleForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VehiclesList />} />
        <Route path="/vehicles/new" element={<VehicleForm />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/vehicles/:id/edit" element={<VehicleForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
