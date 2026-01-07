import { type Vehicle } from "../features/vehicles/vehiclesTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import { deleteVehicle } from '../features/vehicles/vehiclesSlice';

interface VehicleTableProps {
  vehicles: Vehicle[];
}



const VehicleTable = ({ vehicles }: VehicleTableProps) => {
   const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      '¿Seguro que deseas eliminar este vehículo?'
    );

    if (confirmDelete) {
      dispatch(deleteVehicle(id));
    }
  };
  

    return (

    <table className="w-full border border-gray-200 rounded-lg overflow-x-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Placa</th>
          <th className="px-4 py-2 text-left">Marca</th>
          <th className="px-4 py-2 text-left">Modelo</th>
          <th className="px-4 py-2 text-left">Año</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>

      <tbody>
        { vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
            <td className="px-4 py-2">{vehicle.licensePlate}</td>
            <td className="px-4 py-2">{vehicle.make}</td>
            <td className="px-4 py-2">{vehicle.model}</td>
            <td className="px-4 py-2">{vehicle.year}</td>
            <td className="px-4 py-2"> 
            <span className={`px-3 py-1 text-sm rounded-full font-medium
              ${vehicle.status === "Disponible" &&"bg-green-100 text-green-700" }
              ${vehicle.status === "Taller" &&"bg-yellow-100 text-yellow-700" }
              ${vehicle.status === "En servicio" && "bg-blue-100 text-blue-700"}
            `}>
            {vehicle.status}
          </span></td>
            <td className="px-4 py-2">
              <Link to={`/vehicles/${vehicle.id}`} className="text-blue-600 hover:underline">Ver</Link>
              {" | "}
              <Link to={`/vehicles/${vehicle.id}/edit`} className="text-yellow-600 hover:underline">Editar</Link>
              {' | '}
              <button onClick={() => handleDelete(vehicle.id)} className="text-red-600 hover:underline">
                Eliminar
              </button>
            </td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
};

export default VehicleTable;
