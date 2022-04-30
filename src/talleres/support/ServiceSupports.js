
const { Types } = require('@rimac/common');
const {
  FORMATODEDUCIBLE, FORMATOCOPAGO, FORMATOMONEDA, FORMATOTALLER,
  FORMATOTIPO, FORMATODIGITO, MONEDAS, FORMATOMARCA, FORMATOTALLERES,
  FORMATOMARCA_TEXT, TIPOS
} = require('./DomainConstans');


module.exports = {

  validarCopagoYMoneda(l) {
    const regex = new RegExp(FORMATODEDUCIBLE);
    const regex2 = new RegExp(FORMATOCOPAGO);
    const valor = (regex.test(l) && regex2.test(l));
    return valor;
  },
  validarTaller(l) {
    const regex = new RegExp(FORMATOTALLER);
    const valor = regex.test(l);
    return valor;
  },
  obtenerDeducible(line) {
    return parseFloat(line.match(FORMATODEDUCIBLE)[0].match(FORMATODIGITO)[0], 10);
  },
  obtenerTipo(line) {
    const tipos = line.match(FORMATOTIPO);
    if (!Types.isEmpty(tipos)) {
      return tipos.map((tipo) => TIPOS[tipo.toUpperCase()]);
    }
    return ['NO TIPO'];
  },
  obtenerMoneda(line) {
    return MONEDAS[line.match(FORMATOMONEDA)[0]];
  },
  obtenerMonto(line) {
    return parseFloat(line.match(FORMATOCOPAGO)[0].match(FORMATODIGITO)[0], 10);
  },
  obtenerMarca(line) {
    const regex = new RegExp(FORMATOMARCA_TEXT);
    if (regex.test(line)) {
      const marcas = line.match(FORMATOMARCA);
      if (!Types.isEmpty(marcas)) {
        return `(EN MARCAS ${marcas.join(', ')})`.toUpperCase();
      }
    }

    return 'NO MARCA';
  },
  obtenerTalleres(line) {
    const talleres = line.match(FORMATOTALLERES);
    if (!Types.isEmpty(talleres)) {
      return `${talleres.join(', ')}`;
    }
    return 'NO TALLER';
  }
};