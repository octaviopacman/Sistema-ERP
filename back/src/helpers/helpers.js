export const createRecord = async (Model, req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const data = req.body;

    // Crea el registro en la base de datos
    const record = await Model.create(data);

    // Responde con el registro creado
    res.status(201).json({
      success: true,
      message: "Registro creado exitosamente",
      data: record,
    });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el registro",
      error: error.message,
    });
  }
};
