import { configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./slices/sessionSlide";
import { empleadoSlice } from "./slices/empleadoSlice";
import { proveedorSlice } from "./slices/proveedorSlice";
import { productoSlice } from "./slices/productoSlice";
import { clienteSlice } from './slices/clienteSlice'; 
import { proveedoresSlice } from "./slices/proveedoresSlice";

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    empleado: empleadoSlice.reducer,
    proveedor: proveedorSlice.reducer,
    producto: productoSlice.reducer,
    cliente: clienteSlice.reducer,
    proveedores: proveedoresSlice.reducer
  },
});
    
export default store;
