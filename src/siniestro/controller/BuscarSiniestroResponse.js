class BuscarSiniestroResponse {
  constructor({
    status = undefined,
    tipo = undefined,
    valor = undefined,
    mensaje = undefined
  }) {
    this.status = status;
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.valor = valor;
  }
}
module.exports = BuscarSiniestroResponse;
