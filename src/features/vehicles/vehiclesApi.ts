{
  /* axios calls*/
}

import axios from "axios";
import type { Vehicle } from "./vehiclesTypes";

const api = axios.create({
  baseURL: "http://localhost:3001",
});


export const getVehicles = (params?: Record<string, any>) => {
  return api.get<Vehicle[]>("/vehicles", { params });
};

//obtener vehiculo por id
export const getVehicleById = (id: string, ) => {
  return api.get<Vehicle>(`/vehicles/${id}`);
};

//crear vehiculo
export const createVehicle = (vehicle: Omit<Vehicle, "id">) => {
  return api.post<Vehicle>("/vehicles", vehicle);
};

//actualizar vehiculo
export const updateVehicle = (id: string, vehicle: Vehicle) => {
  return api.put(`vehicles/${id}`,vehicle);
};

//eliminar vehiculo
export const deleteVehicle = (id: string) => {
  return api.delete(`vehicles/${id}`);
};
