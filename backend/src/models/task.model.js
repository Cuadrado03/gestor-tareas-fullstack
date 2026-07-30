const VALID_STATUSES = ['pending', 'in_progress', 'done'];
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;

function validateTaskInput(data, { partial = false } = {}) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['El cuerpo de la solicitud debe ser un objeto JSON válido.'] };
  }

  const { title, description, status } = data;

  // title: obligatorio, string, 1-100 caracteres
  if (!partial || title !== undefined) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('El campo "title" es obligatorio y no puede estar vacío.');
    } else if (title.length > TITLE_MAX_LENGTH) {
      errors.push(`El campo "title" no puede superar los ${TITLE_MAX_LENGTH} caracteres.`);
    }
  }

  // description: opcional, máx 500 caracteres
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      errors.push('El campo "description" debe ser una cadena de texto.');
    } else if (description.length > DESCRIPTION_MAX_LENGTH) {
      errors.push(`El campo "description" no puede superar los ${DESCRIPTION_MAX_LENGTH} caracteres.`);
    }
  }

  // status: obligatorio, debe ser uno de los valores permitidos
  if (!partial || status !== undefined) {
    if (!status || !VALID_STATUSES.includes(status)) {
      errors.push(`El campo "status" debe ser uno de: ${VALID_STATUSES.join(', ')}.`);
    }
  }

  return { isValid: errors.length === 0, errors };
}

module.exports = { VALID_STATUSES, validateTaskInput };