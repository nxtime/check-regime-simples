const puppeteer = require('puppeteer')
const addData = require('./add-data')

const getRegime = async (database) => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();
    let empresasFeitas = []
    page.on('requestfailed', request => {
        // console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
    });
    // Catch console log errors
    page.on("pageerror", err => {
        // console.log(`Page error: ${err.toString()}`);
    });
    // Catch all console messages
    page.on('console', msg => {
        // console.log('Logger:', msg.type());
        // console.log('Logger:', msg.text());
        // console.log('Logger:', msg.location());
    });

    for (let i = 626; i < database.length; i++) {

        let cnpj = database[i].CNPJ;
        let nome = database[i].NOME.replaceAll(' ', '_').substring(0, 20)
        nome = cnpj + '_' + nome;

        console.log(nome)
        try {
            await page.goto('https://consopt.www8.receita.fazenda.gov.br/consultaoptantes');
        } catch (err) {
            console.log('Ultima empresa foi ' + database[i].NOME + ' cnpj: ' + database[i].CNPJ)
            console.log('Ultimo loop: ' + i)
        }
        try {
            await page.waitForSelector('#Cnpj')
        } catch (err) {
            console.log('Ultimo loop: ' + i)
        }

        await page.type('#Cnpj', cnpj)
        await page.click('[class="btn btn-verde h-captcha"]');

        await page.waitForNavigation();
        await page.screenshot({ path: `./misc/${nome}.png` });

        try {
            await page.waitForSelector('div.panel-body');
        } catch (err) {
            console.log('Ultimo loop: ' + i)
        }
        const enquadramento = await page.$$eval(('.spanValorVerde'), elements => {
            let opcaoSimples = elements[2].innerText;
            let opcaoSimei = elements[3].innerText;
            return { SIMPLES: opcaoSimples, SIMEI: opcaoSimei }
        })
        console.log(nome)
        addData([{ ...database[i], ...enquadramento }])
        empresasFeitas.push({ ...enquadramento })

    }

    await browser.close();
    return empresasFeitas
}

module.exports = getRegime;