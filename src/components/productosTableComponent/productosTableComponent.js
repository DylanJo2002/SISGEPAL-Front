import * as React from "react";
import deleteIcon from "./images/delete.png";
import editIcon from "./images/edit.png";
import { connect } from "react-redux";
import { updateProducto } from "../../react_redux/slices/productoSlice";
import { doDeleteProductosRequest } from "../../api/request";
import { removeToken } from "../../utils";
import { removeSession } from "../../react_redux/slices/sessionSlide";
const onSelectProducto = (producto_id, codigo_producto, dispatch) => {
  const dataProd = [];  
  const row = document.getElementById(`${producto_id}-${codigo_producto}`);
  row.querySelectorAll("td").forEach((tdProducto, index) => {
    dataProd[index] = tdProducto.innerText;
  });
  const newProductoState = {
    producto_id: dataProd[0],
    codigo_producto: dataProd[1],
    proveedor_id: dataProd[2],
    nombre: dataProd[3],
    stock: dataProd[4],
    precio: dataProd[5],
  };
  console.log(newProductoState);
  dispatch(newProductoState);
};

const onRemoveProducto = (producto_id, removeSession, updateRows) => {
  const confirmAction = window.confirm(
    `¿Está seguro de elminar el producto con id ${producto_id}?`
  );
  if (confirmAction) {
    doDeleteProductosRequest(producto_id).then(({ status, data }) => {
      const { error, producto_id } = data;
      if (!error) {
        updateRows();
        alert(
          `Se eliminó satisfactoriamente el producto con id ${producto_id}`
        );
      } else {
        if (status === 403) {
          removeToken(removeSession);
          return;
        }

        alert(`OCURRIÓ EL SIGUIENTE ERROR. Código: ${status}. Error: ${error}`);
      }
    });
  }
};

function ProductosTableComponent({
  productos,
  enable,
  updateProducto,
  removeSession,
  updateRows,
}) {
  return (
    <div className="container-table">
      <table className="text-center w-100">
        <thead>
          <tr>
            <th>ID</th>
            <th>CODIGO</th>
            <th>PROVEEDOR ID</th>
            <th>NOMBRE</th>
            <th>STOCK</th>
            <th>PRECIO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((row) => (
            <tr
              key={row.producto_id}
              id={`${row.producto_id}-${row.codigo_producto}`}
              className="text-start"
            >
              <td>{row.producto_id}</td>
              <td>{row.codigo_producto}</td>
              <td>{row.proveedor_id}</td>
              <td>{row.nombre}</td>
              <td>{row.stock}</td>
              <td>{row.precio}</td>
              <td>
                <div
                  className={`d-flex gap-2 justify-content-center align-items-center ${
                    enable ? "" : "disable-actions"
                  }`}
                >
                  <div>
                    <img
                      src={editIcon}
                      alt=""
                      onClick={(ev) =>
                        onSelectProducto(
                          row.producto_id,
                          row.codigo_producto,
                          updateProducto
                        )
                      }
                      className="action-icon"
                    />
                  </div>
                  <div>
                    <img
                      src={deleteIcon}
                      alt=""
                      onClick={(ev) =>
                        onRemoveProducto(
                          row.producto_id,
                          removeSession,
                          updateRows
                        )
                      }
                      className="action-icon"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapToDispathToProps = (dispatcher) => {
  return {
    removeSession: () => {
      dispatcher(removeSession());
    },
    updateProducto: (payload) => dispatcher(updateProducto(payload)),
  };
};
export default connect(null, mapToDispathToProps)(ProductosTableComponent);