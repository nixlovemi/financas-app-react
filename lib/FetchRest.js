export const WEBSERVICE_URL   = 'http://crochepassoapasso.com.br/financas/Rest/';
export const WEBSERVICE_TOKEN = '9837f6f54e56b471aaa046192d488587';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @param {string} url 
 * @param {string} headers 
    *  "{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        }"
 */
export const readRest = (url, headers={}) => new Promise((resolve, reject) => {
    fetch(url, headers)
    .then(res => res.json())
    .then((data) => {
        resolve (
            {
                result: data,
                isOk: true,   // da requisicao, nao da resposta
                errorMsg: ''  // da requisicao, nao da resposta
            }
        );
    })
    .catch((error) => {
        resolve (
            {
                result: {},
                isOk: false,    // da requisicao, nao da resposta
                errorMsg: error // da requisicao, nao da resposta
            }
        );
    });
});