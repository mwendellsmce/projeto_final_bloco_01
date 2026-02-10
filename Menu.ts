import { Input } from './src/util/Input'
import { Jogo } from './src/model/Jogo'
import { ProdutoController } from './src/controller/ProdutoController'

export const produtos: ProdutoController = new ProdutoController()

export function main() {

    let opcao: number

    criarProdutosTeste()

    while (true) {

        console.log('*****************************************************')
        console.log('                                                     ')
        console.log('                GENERATION GAMES                     ')
        console.log('                                                     ')
        console.log('*****************************************************')
        console.log('                                                     ')
        console.log('            1 - Listar todos os Produtos             ')
        console.log('            2 - Listar Produto pelo ID               ')
        console.log('            3 - Cadastrar Produto                    ')
        console.log('            4 - Atualizar Produto                    ')
        console.log('            5 - Deletar Produto                      ')
        console.log('            0 - Sair                                 ')
        console.log('                                                     ')
        console.log('*****************************************************')
        console.log('                                                     ')

        console.log('Entre com a opção desejada: ')
        opcao = Input.questionInt('')

        if (opcao == 0) {
            console.log('\nGeneration Games - Press Start!')
            sobre()
            process.exit(0)
        }

        switch (opcao) {
            case 1:
                console.log('\n\nListar todos os Produtos\n\n')
                listarProdutos()
                keyPress()
                break
            case 2:
                console.log('\n\nListar Produto pelo ID\n\n')
                listarProdutoPorId()
                keyPress()
                break
            case 3:
                console.log('\n\nCadastrar Produto\n\n')
                cadastrarProduto()
                keyPress()
                break
            case 4:
                console.log('\n\nAtualizar Produto\n\n')
                atualizarProduto()
                keyPress()
                break
            case 5:
                console.log('\n\nDeletar Produto\n\n')
                deletarProduto()
                keyPress()
                break
            default:
                console.log('\nOpção Inválida!\n')
                keyPress()
                break
        }
    }
}

// funcoes menu crud
function listarProdutos(): void {
    produtos.listarTodos()
}

function listarProdutoPorId(): void {
    console.log('Digite o ID do Produto: ')
    const id = Input.questionInt('')
    produtos.procurarPorId(id)
}

function cadastrarProduto(): void {
    let nome: string, tipo: number, preco: number, marca: string, genero: string

    // opção de cancelar
    console.log('Digite o Nome do Produto (ou Pressione ENTER para cancelar): ')
    nome = Input.question('')

    if (nome === '') {
        console.log('\nOperação de Cadastro Cancelada!')
        return // sai da função e volta pro menu
    }

    do {
        console.log('Digite o Tipo do Produto (1-Jogo): ')
        tipo = Input.questionInt('')
    } while (tipo !== 1)

    // impedir preço negativo
    do {
        console.log('Digite o Preço do Produto: ')
        preco = Input.questionFloat('')
        
        if (preco < 0) {
            console.log('O preço deve ser um valor positivo! Tente novamente.')
        }
    } while (preco < 0)

    console.log('Digite a Marca do Produto: ')
    marca = Input.question('')

    switch (tipo) {
        case 1:
            console.log('Digite o Gênero do Jogo: ')
            genero = Input.question('')
            
            produtos.cadastrar(new Jogo(0, nome, tipo, preco, marca, genero))
            break
    }
}

function atualizarProduto(): void {
    console.log('Digite o ID do Produto: ')
    const id = Input.questionInt('')

    // busca o produto
    let produto = produtos.buscarNoArray(id)

    if (produto !== null) {
        let nome: string, tipo: number, preco: number, marca: string, genero: string
        let entrada: string

        // nome
        console.log(`\nNome atual: ${produto.nome}`)
        console.log('Digite o Novo Nome (ou Pressione ENTER para manter): ')
        entrada = Input.question('')
        // se não digitar nada mantém o original
        nome = entrada.trim() === '' ? produto.nome : entrada

        // não vamos alterar o tipo por compatibildiade 
        tipo = produto.tipo

        // preco
        console.log(`\nPreço atual: ${produto.preco}`)
        console.log('Digite o Novo Preço (ou Pressione ENTER para manter): ')
        entrada = Input.question('')
        // Converte vírgula para ponto e transforma em número
        preco = entrada.trim() === '' ? produto.preco : parseFloat(entrada.replace(',', '.'))

        // marca
        console.log(`\nMarca atual: ${produto.marca}`)
        console.log('Digite a Nova Marca (ou Pressione ENTER para manter): ')
        entrada = Input.question('')
        marca = entrada.trim() === '' ? produto.marca : entrada

        // dados extras de cada produto
        switch (tipo) {
            case 1: // Jogo
                let jogo = produto as Jogo 
                
                console.log(`\nGênero atual: ${jogo.genero}`)
                console.log('Digite o Novo Gênero (ou Pressione ENTER para manter): ')
                entrada = Input.question('')
                genero = entrada.trim() === '' ? jogo.genero : entrada

                produtos.atualizar(new Jogo(id, nome, tipo, preco, marca, genero))
                break
        }
        
    } else {
        console.log(`Produto com ID ${id} não encontrado!`)
    }
}

function deletarProduto(): void {
    console.log('Digite o ID do Produto (ou pressione ENTER para cancelar): ')
    const idInput = Input.question('')

    // Se a pessoa apertou Enter sem digitar nada, sai da função
    if (idInput === '') {
        console.log('\nOperação Cancelada!')
        return 
    }

    // Tenta transformar o texto em número
    const id = parseInt(idInput)

    // Verifica se o que foi digitado é realmente um número válido
    if (isNaN(id)) {
        console.log('\nValor inválido! O ID deve ser um número.')
    } else {
        produtos.deletar(id)
    }
}

// Função para gerar dados de teste
function criarProdutosTeste(): void {
    produtos.cadastrar(new Jogo(0, "Red Dead Redemption 2", 1, 250.00, "Rockstar", "Ação"))
    produtos.cadastrar(new Jogo(0, "The Legend of Zelda", 1, 300.00, "Nintendo", "Aventura"))
    produtos.cadastrar(new Jogo(0, "Castlevania Symphony of the Night", 1, 200.00, "Konami", "Ação e aventura"))
}

// funcoes gerais
function sobre(): void {
    console.log('\n*****************************************************')
    console.log('Projeto Desenvolvido por: Marcus Wendell')
    console.log('github.com/mwendellsmce')
    console.log('Email: mwendelldev@gmail.com')
    console.log('*****************************************************')
}

function keyPress(): void {
    console.log('\nPressione enter para continuar...')
    Input.question('')
}

main()
