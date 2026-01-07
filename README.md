# 📦 Fleet Track Challenge – Frontend

Este proyecto es una aplicación frontend para la gestión de una flota de vehículos (fleet management).

Permite listar, buscar, filtrar, paginar, crear, editar, visualizar y eliminar vehículos utilizando una API simulada.

---

## 🚀 Funcionalidades

- Listado de vehículos
- Búsqueda por placa, marca o modelo
- Filtro por estado (Disponible / Taller / En servicio)
- Paginación
- Vista de detalle de vehículo
- Crear nuevo vehículo
- Editar vehículo existente
- Eliminar vehículo 

---

## 🛠️ Tecnologías usadas

- React
- TypeScript
- Redux Toolkit
- React Router
- Axios
- TailwindCSS
- json-server (API mock)

---

## 🧱 Arquitectura del proyecto

El proyecto está organizado por **features**, facilitando el mantenimiento y la escalabilidad.
```bash
src/
├─ app/ # Store de Redux y hooks tipados
├─ features/
│ └─ vehicles/ # Lógica de negocio de vehículos (slice, api, types)
├─ pages/ # Vistas principales
├─ components/ # Componentes reutilizables
└─ router/ # Configuración de rutas
```

La lógica de negocio, el estado global y la UI están claramente separados.

---

## 🔄 Manejo de estado

Redux Toolkit se utiliza para manejar:

- Lista de vehículos
- Vehículo seleccionado
- Estados de carga y error
- Búsqueda, filtros y paginación

Las operaciones asíncronas (fetch, create, update, delete) se manejan con `createAsyncThunk`.

La búsqueda, los filtros y la paginación se implementan en el frontend como lógica derivada del estado, usando memoización para evitar renders innecesarios.

## 🧠 Decisiones técnicas

- La búsqueda, filtros y paginación se implementan en el frontend para demostrar manejo de estado y lógica de UI, ya que el backend es una API mock.
- json-server se utiliza únicamente como simulación de backend.
- Redux Toolkit se eligió para centralizar el estado y manejar operaciones asíncronas de forma clara.

---

## 🌐 API Mock

El backend se simula usando `json-server`.

Endpoints principales:

- `GET /vehicles`
- `GET /vehicles/:id`
- `POST /vehicles`
- `PUT /vehicles/:id`
- `DELETE /vehicles/:id`

---

## ▶️ Cómo ejecutar el proyecto

### 1. Instalar dependencias
```bash
npm install
```
2. Levantar la API mock
```bash
npx json-server --watch data/db.json --port 3001
```

3. Levantar el frontend
```bash
npm run dev
```

📌 Notas finales

El formulario de crear y editar comparte el mismo componente.

Las validaciones se realizan en el frontend.

La API se utiliza como mock para simular un entorno real de trabajo.

---
👤 Autor

Desarrollado como parte de un reto técnico frontend.

