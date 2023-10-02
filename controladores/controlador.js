const produtos = require("../src/bancodedados/produtos")
const { getStateFromZipcode } = require('utils-playground')


const listaProdutos = (req, res) => {
    return res.status(200).json(produtos)
}

const produtosPorId = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).json({ mensagem: 'O id deve ser um numero' })
    }
    const produto = produtos.find((produto) => {
        return produto.id === Number(id)
    })

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' })
    }
    return res.status(200).json(produto)
}

const calculoFrete = async (req, res) => {        

    const { id, cep } = req.params;

    if (isNaN(id)) {
        res.status(400).json({ mensagem: 'O ID deve ser Numérico' })
    }
    if (isNaN(cep)) {
        res.status(400).json({ mensagem: 'O CEP deve conter somente Numeros' })
    }else if(cep.length !== 8){
      return  res.status(400).json({ mensagem: 'CEP invalido' });
    }
    
    const estado = await getStateFromZipcode(cep);          
   
    let preçoFrete = 12;           

        switch (estado) {
            case "SP" || "RJ":
                preçoFrete = 10;
                break
            case "BA" || "SE" || "AL" || "PE" || "PB":
                preçoFrete = 15;
                break
        }       
    

    const produto = produtos.find((produto) => {
        return produto.id === Number(id);
    })

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

let acrecimo = (produto.valor / 100) *  preçoFrete
let frete = acrecimo + produto.valor

    return res.status(200).json({produto, estado, frete});

}


module.exports = { listaProdutos, produtosPorId, calculoFrete };