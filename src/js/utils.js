
export function convertToEuropeanFormat(number) {
  
  if(number === '--') return '--'
  
  // Verificar si el número es válido y está en formato americano
  if (typeof number !== 'number' || isNaN(number)) {
    throw new Error('El valor proporcionado no es un número válido.');
  }

  return `${number.toLocaleString('es-ES')} €`;
}