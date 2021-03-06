const chalk = require('chalk')
const fs = require('fs')

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResultados = []
    let temp

    while((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({
            [temp[1]]: temp[2]
        })
    }

    return arrayResultados.length === 0 ? 'Não há links' : arrayResultados
}

const trataErro = (erro) => {
    throw new Error(chalk.red(erro.code, '- NÃO HÁ ARQUIVO NO CAMINHO'))
}

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, 'utf-8')
        return extraiLinks(texto)
    } catch (erro) {
        trataErro(erro)
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

module.exports = pegaArquivo
