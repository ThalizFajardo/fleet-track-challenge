import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { type VehicleFormData } from "../features/vehicles/vehiclesTypes";
import {
  createVehicle,
  updateVehicle,
  fetchVehicleById,
} from "../features/vehicles/vehiclesSlice";
import type {
  VehicleStatus,
} from "../features/vehicles/vehiclesTypes";



const VehicleForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedVehicle, loading, error } = useAppSelector(
    (state) => state.vehicles
  );

  const [formData, setFormData] = useState<VehicleFormData>({
    licensePlate: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    status: "Disponible",
    odometer: 0,
    lastService: "",
    gpsActive: false,
    location: { lat: 0, lng: 0 },
  });

  // Traer vehículo si es edición
  useEffect(() => {
  if (isEditMode && id) {
    dispatch(fetchVehicleById(id));
  }
}, [isEditMode, id, dispatch]);



  // Cargar datos en el form
  useEffect(() => {
  if (isEditMode && selectedVehicle) {
    const { id, ...rest } = selectedVehicle;
    setFormData(rest);
  }

  if (!isEditMode) {
    setFormData({
      licensePlate: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      status: "Disponible",
      odometer: 0,
      lastService: "",
      gpsActive: false,
      location: { lat: 0, lng: 0 },
    });
  }
}, [isEditMode, selectedVehicle]);
;

const validateForm = () => {
  if (!formData.licensePlate.trim()) return "La placa es obligatoria";
  if (!formData.make.trim()) return "La marca es obligatoria";
  if (!formData.model.trim()) return "El modelo es obligatorio";

  if (formData.year < 1990 || formData.year > new Date().getFullYear()) {
    return "Año inválido";
  }

  if (formData.odometer < 0) {
    return "El kilometraje no puede ser negativo";
  }

  return null;
};


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type, checked } = e.target as HTMLInputElement;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
  

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errorMessage = validateForm();
  if (errorMessage) {
    alert(errorMessage);
    return;
  }

  if (isEditMode && id) {
    dispatch(updateVehicle({ id, ...formData }));
  } else {
    dispatch(createVehicle(formData));
  }

  navigate("/");
};



  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Editar vehículo" : "Crear vehículo"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          name="licensePlate"
          placeholder="Placa"
          value={formData.licensePlate}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border px-3 py-2 rounded"
          name="make"
          placeholder="Marca"
          value={formData.make}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border px-3 py-2 rounded"
          name="model"
          placeholder="Modelo"
          value={formData.model}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border px-3 py-2 rounded"
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />

        <select
          className="w-full border px-3 py-2 rounded"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {(["Disponible", "Taller", "En servicio"] as VehicleStatus[]).map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>

        <input
          className="w-full border px-3 py-2 rounded"
          type="number"
          name="odometer"
          value={formData.odometer}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="gpsActive"
            checked={formData.gpsActive}
            onChange={handleChange}
          />
          GPS activo
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
