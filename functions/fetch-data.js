const xlsx = require('xlsx');

const fetchData = (filepath = "modelo_socios.xlsx") => {
    console.log(filepath);
    const workbook = xlsx.readFile(filepath);
    console.log('estou aqui')
    let worksheets = {};

    for (const sheetName of workbook.SheetNames) {
        worksheets[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    const data = JSON.parse(JSON.stringify(worksheets)).Regime;
    // for (const empresa of data) {
    //     console.log(empresa.NOME)
    //     console.log(empresa.CNPJ)
    // }
    return data;
}

module.exports = fetchData;