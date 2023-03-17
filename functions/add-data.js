const xlsx = require('xlsx');

const excel = (empresas, appendInformation = true) => {
    const alphabet = [
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    let someData = [];
    let data = ""

    if (appendInformation) {
        let count = 0;
        someData = xlsx.readFile("Regime Empresas.xlsx");
        let worksheets = {};
        for (const sheetName of someData.SheetNames) {
            worksheets[sheetName] = xlsx.utils.sheet_to_json(someData.Sheets[sheetName]);
        }
        someData = JSON.parse(JSON.stringify(worksheets)).Regime;

        console.log(someData)

    } else {

        someData = [
            {
                "CNPJ DA EMPRESA": empresas[0].CNPJ,
                "NOME DA EMPRESA": empresas[0].NOME,
                "OPÇÃO SIMPLES": empresas[0].SIMPLES,
                "OPÇÃO SIMEI": empresas[0].SIMEI,
            }
        ];
    }
    // console.log(empresas);
    // console.log(someData);
    console.log(empresas)
    for (i = 0; i < empresas.length; i++) {
        someData.push({
            "CNPJ DA EMPRESA": empresas[i].CNPJ,
            "NOME DA EMPRESA": empresas[i].NOME,
            "OPÇÃO SIMPLES": empresas[i].SIMPLES,
            "OPÇÃO SIMEI": empresas[i].SIMEI,
        })
    }


    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(someData);

    xlsx.utils.book_append_sheet(newWB, newWS, "Regime");
    xlsx.writeFile(newWB, "Regime Empresas.xlsx");
    console.log("Planilha atualizada com sucesso");
}

module.exports = excel;