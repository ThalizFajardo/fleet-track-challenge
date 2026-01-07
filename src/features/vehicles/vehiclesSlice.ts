{/* slices + thunks*/}

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Vehicle, VehicleStatus } from "./vehiclesTypes";
import * as vehiclesAPI from "./vehiclesApi";
import type { RootState } from "../../app/store";

interface VehiclesState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
  page: number;
  search: string;
  statusFilter: VehicleStatus | "";
}

const initialState: VehiclesState = {
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
  page: 1,
  search: "",
  statusFilter: "",
};

export const fetchVehicles = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState; rejectValue: string }
>("vehicles/fetchVehicles", async (_, { rejectWithValue }) => {
  try {
    const response = await vehiclesAPI.getVehicles({
      _sort: "id",
      _order: "asc",
    });

    return response.data;
  } catch {
    return rejectWithValue("Error al cargar vehículos");
  }
});

export const fetchVehicleById = createAsyncThunk<
  Vehicle,
  string,
  { rejectValue: string }
>("vehicles/fetchVehicleById", async (id, { rejectWithValue }) => {
  try {
    const response = await vehiclesAPI.getVehicleById(id);
    return response.data;
  } catch {
    return rejectWithValue("Error al cargar el vehículo");
  }
});

export const deleteVehicle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("vehicles/deleteVehicle", async (id, { rejectWithValue }) => {
  try {
    await vehiclesAPI.deleteVehicle(id);
    return id;
  } catch {
    return rejectWithValue("Error al eliminar vehículo");
  }
});

export const updateVehicle = createAsyncThunk<
  Vehicle,
  Vehicle,
  { rejectValue: string }
>("vehicles/updateVehicle", async (vehicle, { rejectWithValue }) => {
  try {
    const response = await vehiclesAPI.updateVehicle(vehicle.id, vehicle);
    return response.data;
  } catch {
    return rejectWithValue("Error al actualizar vehículo");
  }
});

export const createVehicle = createAsyncThunk<
  Vehicle,
  Omit<Vehicle, "id">,
  { rejectValue: string }
>("vehicles/createVehicle", async (vehicle, { rejectWithValue }) => {
  try {
    const response = await vehiclesAPI.createVehicle(vehicle);
    return response.data;
  } catch {
    return rejectWithValue("Error al crear vehículo");
  }
});

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<VehicleStatus | "">) {
      state.statusFilter = action.payload;
    },
    clearSelectedVehicle(state) {
      state.selectedVehicle = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.vehicles = action.payload;
      })

      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVehicle = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.filter(
          (vehicle) => vehicle.id !== action.payload
        );
      })

      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles.push(action.payload);
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })

      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.map((vehicle) =>
          vehicle.id === action.payload.id ? action.payload : vehicle
        );
        state.selectedVehicle = action.payload;
      })

      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      });
  },
});

export const { setPage, setSearch, setStatusFilter, clearSelectedVehicle } =
  vehiclesSlice.actions;

export default vehiclesSlice.reducer;
