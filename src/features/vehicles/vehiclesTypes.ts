

export type VehicleStatus = 'Disponible' | 'Taller' | 'En servicio';

export interface Location{
    lat:number;
    lng:number;
} 

export interface Vehicle {
      id: string;
      licensePlate: string ;
      make:  string;
      model:  string;
      year: number;
      status: VehicleStatus;
      location:Location;
      lastService: string;
      odometer: number;
      gpsActive: boolean;    
}

export type VehicleFormData = Omit<Vehicle, "id">;
