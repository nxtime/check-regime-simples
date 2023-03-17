const { readFile, utils } = require('xlsx');

const data = () => {
    const workbook = readFile("../misc/Modelo percentual sócios.xlsx");

    let worksheets = {};

    for (const sheetName of workbook.SheetNames) {
        worksheets[sheetName] = utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    const data = JSON.parse(JSON.stringify(worksheets)).Percentual;

    console.log(data)

    // for (const empresa of data) {
    //     console.log(empresa.NOME)
    //     console.log(empresa.CNPJ)
    // }
    return data;
}

module.exports = data;