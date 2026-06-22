/**
 * clase encargada de construir la respuestas del api estandar
 */

export class ResponseHelper {
    // respuesta exitosa.
  static success(data: any, statusCode = 200) {
    return {
      success: true,
      statusCode,
      data,
    };
  }
  //  Respuestas de error
  static error(
    data: any,
    statusCode: 400
  ){
    return {
      success: true,
      statusCode,
      data,
    };
  }
}
