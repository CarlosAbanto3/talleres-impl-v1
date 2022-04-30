module.exports.DIGITO = '\\d+\\.?\\d*';
module.exports.FORMATODEDUCIBLE = new RegExp(`${this.DIGITO}%`, 'gi');
module.exports.MONEDAS = {
  'S/.': 'PEN',
  US$: 'USD'
};
module.exports.COMIDIN = /\//g;
// eslint-disable-next-line
module.exports.MONEDAS_TEXT = `(${Object.keys(this.MONEDAS).join('|').replace(/\//g, '\\\/').replace(/\$/g, '\\$').replace(/\./g, '\\.')})`;
// eslint-disable-next-line
module.exports.FORMATOCOPAGO = new RegExp(`${this.MONEDAS_TEXT} ?${this.DIGITO}`, 'gi');
module.exports.FORMATOMONEDA = new RegExp(this.MONEDAS_TEXT, 'gi');
module.exports.FORMATOTALLER = /taller/gi;
module.exports.FORMATOMARCA_TEXT = /marca/gi;
module.exports.FORMATODIGITO = new RegExp(`${this.DIGITO}`, 'gi');
module.exports.TIPOS = {
  MULTIMARCA: 'Multimarca',
  CONCESIONARIOS: 'Concesionarios'
};
module.exports.FORMATOTIPO = new RegExp(`${Object.keys(this.TIPOS).join('|')}`, 'gi');
module.exports.MARCAS = [
  'ALFA ROMEO',
  'FIAT',
  'AUDI',
  'BMW',
  'MERCEDES BENZ',
  'JEEP',
  'CHRYSLER',
  'CHEVROLET',
  'DAEWOO',
  'DAIHATSU',
  'FORD',
  'HONDA',
  'HYUNDAI',
  'KIA',
  'LAND ROVER',
  'MAZDA',
  'MITSUBISHI',
  'NISSAN',
  'PEUGEOT',
  'RENAULT',
  'SSANG YONG',
  'SEAT',
  'SUBARU',
  'SUZUKI',
  'TOYOTA',
  'VOLKSWAGEN',
  'VOLVO',
  'PORSCHE CAYENNE'
];
module.exports.TALLERES = [
  'ITAL MOTORS S.A.C.',
  'SEREINSA',
  'EUROMOTORS - AUDI ZENTRUM',
  'AUTOS AMERICANOS',
  'AUTOS AMERICANOS',
  'GERMANIA AUTOMOTRIZ (SERVICIO ESPECIALIZADO)',
  'AUTOS AMERICANOS',
  'AUTOMOTRIZ SAN BORJA (SERVICIO ESPECIALIZADO)',
  'AUTOS AMERICANOS',
  'DERCO',
  'AMERICAN MOTORS',
  'MASS AUTOMOTRIZ',
  'AK - MIRAFLORES',
  'AUTO KOREA S.A.C.',
  'MASS AUTOMOTRIZ',
  'DAIHATSU DEL PERU',
  'AUTO LAND',
  'MANASA',
  'JAPAN AUTOS',
  'MASAKI',
  'AUTOMOTORES GILDEMEISTER',
  'LE VOLANT',
  'AUTOCAM',
  'KIA IMPORT PERU',
  'AUTOLAND',
  'ALESE S.A.C',
  'MANASA – CAMACHO',
  'AUTOLAND',
  'MANASA',
  'AUTOS PEÑARANDA',
  'AUTOS AMERICANOS',
  'SAN BLAS',
  'NISSAN MAQUINARIAS',
  'ALMACENES SANTA CLARA',
  'BRAILLARD',
  'AUTOFRANCE',
  'MUÑOZ AUTOS',
  'NISSAN MAQUINARIAS',
  'ALTOS ANDES',
  'EUROMOTORS - EUROSPORT',
  'AUTOS AMERICANOS',
  'EL AUTODROMO',
  'AUTOMOTRIZ LAVAGNA',
  'DERCO',
  'MASS AUTOMOTRIZ',
  'MITSUI AUTOMOTRIZ',
  'PANA AUTOS',
  'PANATEC',
  'RESEPANA',
  'MARINA MOTORS (SERVICIO ESPECIALIZADO)',
  'TK SERVICE',
  'EUROMOTORS - EUROSHOP',
  'EUROMOTORS - MOLIWAGEN',
  'EUROMOTORS - PERUWAGEN',
  'AMSA',
  'FLECHELLE',
  'ECOLINEA',
  'MANASA – CAMACHO'
];
// eslint-disable-next-line
module.exports.MARCAS_TEXT = `(${this.MARCAS.join('|').replace(/\./g, '\\.')})`;
module.exports.FORMATOMARCA = new RegExp(this.MARCAS_TEXT, 'gi');
// eslint-disable-next-line
module.exports.TALLERES_TEXT = `(${this.TALLERES.join('|').replace(/\./g, '\\.')})`;
module.exports.FORMATOTALLERES = new RegExp(this.TALLERES_TEXT, 'gi');
