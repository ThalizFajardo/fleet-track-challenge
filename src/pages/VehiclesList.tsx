import { useEffect, useMemo  } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchVehicles,setSearch,
  setPage,
  setStatusFilter,  } from "../features/vehicles/vehiclesSlice";
import { Link } from "react-router-dom";
import VehicleTable from "../components/VehicleTable";

const VehiclesList = () => {
  const dispatch = useAppDispatch();

  const { vehicles, loading, error, search, statusFilter, page } = useAppSelector(
    (state) => state.vehicles
  );

  const filteredVehicles = useMemo(() => {
  return vehicles.filter(vehicle => {
    const textMatch =
      `${vehicle.licensePlate} ${vehicle.make} ${vehicle.model}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "" || vehicle.status === statusFilter;

    return textMatch && statusMatch;
  });
}, [vehicles, search, statusFilter]);


const pageSize = 10;

const paginatedVehicles = useMemo(() => {
  const start = (page - 1) * pageSize;
  return filteredVehicles.slice(start, start + pageSize);
}, [filteredVehicles, page]);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
   dispatch(setPage(1))
  };

  

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  dispatch(setStatusFilter(e.target.value as "" | "Disponible" | "Taller" | "En servicio"));
  dispatch(setPage(1));
};
  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch ]);


  if (error) {
    return <div>Error: {error}</div>;
  }


const totalPages = Math.ceil(filteredVehicles.length / pageSize);


  return (
    <div className="max-w-6xl mx-auto p-6">
     {loading && <p>Cargando...</p>}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listado de vehículos</h1>

        <div className="flex gap-4 mb-4">
          <input
            placeholder="Buscar por placa, marca o modelo"
            value={search}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded w-full"
          />

          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Todos</option>
            <option value="Disponible">Disponible</option>
            <option value="Taller">Taller</option>
            <option value="En servicio">En servicio</option>
          </select>
        </div>

        <Link
          to="/vehicles/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nuevo vehículo
        </Link>
      </div>

      <VehicleTable vehicles={paginatedVehicles} />
      <div className="flex justify-end items-center gap-4 mt-4">
  <button
    disabled={page === 1}
    onClick={() => dispatch(setPage(page - 1))}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Anterior
  </button>

  <span>Página {page}</span>

 <button
 disabled={page >= totalPages}
 onClick={() => dispatch(setPage(page + 1))}
  className="px-3 py-1 border rounded disabled:opacity-50"
>
  Siguiente
</button>
</div>

    </div>
  );
};

export default VehiclesList;
