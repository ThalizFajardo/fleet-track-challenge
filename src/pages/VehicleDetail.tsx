import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchVehicleById,
  deleteVehicle,
} from "../features/vehicles/vehiclesSlice";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
const navigate = useNavigate();

const handleDelete = async ()=>{
  if (!selectedVehicle) return;

  const confirm = window.confirm(
    "¿Seguro que deseas eliminar este vehículo?"
  );

  if (!confirm) return;

  await dispatch(deleteVehicle(selectedVehicle.id)).unwrap();

  navigate("/");
}


  const { selectedVehicle, loading, error } = useAppSelector(
    (state) => state.vehicles
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchVehicleById((id)));
    }
  }, [dispatch, id]);

  if (loading) return <div className="p-6">Cargando vehículo...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!selectedVehicle) return <div className="p-6">Vehículo no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow border p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {selectedVehicle.make} {selectedVehicle.model}
            </h1>
            <p className="text-gray-500">
              Placa:{" "}
              <span className="font-medium">
                {selectedVehicle.licensePlate}
              </span>
            </p>
          </div>

          <span
            className={`px-3 py-1 text-sm rounded-full font-medium
              ${
                selectedVehicle.status === "Disponible" &&
                "bg-green-100 text-green-700"
              }
              ${
                selectedVehicle.status === "Taller" &&
                "bg-yellow-100 text-yellow-700"
              }
              ${
                selectedVehicle.status === "En servicio" &&
                "bg-blue-100 text-blue-700"
              }
            `}
          >
            {selectedVehicle.status}
          </span>
        </div>

        <hr />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Info */}
          <div className="space-y-3 text-sm">
            <h2 className="font-semibold text-lg">Información general</h2>
            <p>
              <span className="font-medium">Año:</span>{" "}
              {selectedVehicle.year}
            </p>
            <p>
              <span className="font-medium">Kilometraje:</span>{" "}
              {selectedVehicle.odometer.toLocaleString()} km
            </p>
            <p>
              <span className="font-medium">Último servicio:</span>{" "}
              {selectedVehicle.lastService}
            </p>
            <p>
              <span className="font-medium">GPS activo:</span>{" "}
              {selectedVehicle.gpsActive ? "Sí" : "No"}
            </p>
          </div>

         
          <div className="space-y-3 text-sm">
            <h2 className="font-semibold text-lg">Ubicación</h2>

            <div className="bg-gray-50 rounded p-4">
              <p>
                <span className="font-medium">Lat:</span>{" "}
                {selectedVehicle.location.lat}
              </p>
              <p>
                <span className="font-medium">Lng:</span>{" "}
                {selectedVehicle.location.lng}
              </p>
            </div>

           
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Link
            to={`/vehicles/${selectedVehicle.id}/edit`}
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Editar
          </Link>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
