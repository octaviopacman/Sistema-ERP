import React, {useEffect, useState} from "react";
import {Input, Button, Table, Modal, useDisclosure} from "@nextui-org/react";

export default function TableManager() {
  const [tablas, setTablas] = useState([]);
  const [seleccionarTabla, setSeleccionarTabla] = useState(null);
  const [nuevoCampo, setNuevoCampo] = useState("");
  const [editarCampo, setEditarCampo] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchTablas = async () => {
      try {
        const response = await fetch("THIAGO HACE LA API PARA OBTENER TABLAS", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("ERROR AL OBTENER LAS TABLAS");
        }
        const data = await response.json();
        setTablas(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };
    fetchTablas();
  }, []);

  const eliminarTabla = async (id) => {
    try {
      const response = await fetch(
        `THIAGO HACE LA API PARA ELIMINAR LAS TABLAS/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("ERROR AL ELIMINAR LAS TABLAS");
      }
      setTablas(tablas.filter((tabla) => tabla.id !== id));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const agregarCampo = async () => {
    try {
      const response = await fetch(
        `THIAGO HACE LA API PARA AGREGAR CAMPO/${seleccionarTabla.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({field: nuevoCampo}),
        }
      );
      if (!response.ok) {
        throw new Error("ERROR AL AGREGAR UN CAMPO");
      }
      const actualizarTabla = await response.json();
      setTablas(
        tablas.map((tabla) =>
          tabla.id === seleccionarTabla.id ? actualizarTabla : tabla
        )
      );
      setNuevoCampo("");
      onOpenChange();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const eliminarCampo = async (fieldId) => {
    try {
      const response = await fetch(
        `THIAGO HACE LA API PARA ELIMINAR CAMPO/${seleccionarTabla.id}/${fieldId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("ERROR AL ELIMINAR EL CAMPO");
      }
      const actualizarTabla = await response.json();
      setTablas(
        tablas.map((tabla) =>
          tabla.id === seleccionarTabla.id ? actualizarTabla : tabla
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const modificarCampo = async (fieldId) => {
    try {
      const response = await fetch(
        `THIAGO HACE LA API PARA EDITAR EL CAMPO/${seleccionarTabla.id}/${fieldId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({field: editarCampo}),
        }
      );
      if (!response.ok) {
        throw new Error("ERROR AL EDITAR EL CAMPO");
      }
      const actualizarTabla = await response.json();
      setTablas(
        tablas.map((tabla) =>
          tabla.id === seleccionarTabla.id ? actualizarTabla : tabla
        )
      );
      setEditarCampo("");
      onEditClose();
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const editarTabla = (tabla) => {
    setSeleccionarTabla(tabla);
    onEditOpen();
  };

  return (
    <div className="p-5">
      <h2 className="text-xl mb-4">Tablas Disponibles</h2>
      <Table>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>Nombre</Table.Column>
          <Table.Column>Acciones</Table.Column>
        </Table.Header>
        <Table.Body>
          {tablas.map((tabla) => (
            <Table.Row key={tabla.id}>
              <Table.Cell>{tabla.id}</Table.Cell>
              <Table.Cell>{tabla.name}</Table.Cell>
              <Table.Cell>
                <Button size="sm" onPress={() => editarTabla(tabla)}>
                  Editar
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onPress={() => eliminarTabla(tabla.id)}>
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className="p-5">
          <h3>Agregar nuevo campo</h3>
          <Input
            label="Nombre del campo"
            placeholder="Nombre..."
            value={nuevoCampo}
            onChange={(e) => setNuevoCampo(e.target.value)}
          />
          <Button onPress={agregarCampo}>Agregar</Button>
        </div>
      </Modal>
      {seleccionarTabla && (
        <Modal isOpen={isEditOpen} onOpenChange={onEditClose}>
          <div className="p-5">
            <h3>Editar Tabla: {seleccionarTabla.name}</h3>
            <p>ID: {seleccionarTabla.id}</p>
            <Table>
              <Table.Header>
                <Table.Column>ID Campo</Table.Column>
                <Table.Column>Nombre Campo</Table.Column>
                <Table.Column>Acciones</Table.Column>
              </Table.Header>
              <Table.Body>
                {seleccionarTabla.field.map((field) => (
                  <Table.Row key={field.id}>
                    <Table.Cell>{field.id}</Table.Cell>
                    <Table.Cell>{field.name}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="sm"
                        onPress={() => {
                          setEditarCampo(field.name);
                          modificarCampo(field.id);
                        }}>
                        Modificar
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() => eliminarCampo(field.id)}>
                        Eliminar
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Button color="success" onPress={onEditClose}>
              Guardar Cambios
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
