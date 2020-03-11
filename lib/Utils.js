export const decodeHtmlEntities = (vText) => {
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    return entities.decode( vText );
};

export const numberToReal = (numero) => {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}