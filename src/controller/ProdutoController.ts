import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoController implements ProdutoRepository {

    // coleção de Produtos 
    private listaProdutos: Array<Produto> = new Array<Produto>()

    // para controlar o ID 
    public id: number = 0


    // metodos do crud
    
    procurarPorId(id: number): void {
        let buscaProduto = this.buscarNoArray(id)

        if (buscaProduto !== null) {
            buscaProduto.visualizar()
        } else {
            console.log(`\nO Produto com ID ${id} não foi encontrado!`)
        }
    }

    listarTodos(): void {
        for (let produto of this.listaProdutos) {
            produto.visualizar()
        }
    }

    cadastrar(produto: Produto): void {
        produto.id = this.gerarId()
        this.listaProdutos.push(produto)
        console.log("\nO Produto foi cadastrado com sucesso!")
    }

    atualizar(produto: Produto): void {
        let buscaProduto = this.buscarNoArray(produto.id)

        if (buscaProduto !== null) {
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] = produto
            console.log(`\nO Produto com ID ${produto.id} foi atualizado com sucesso!`)
        } else {
            console.log(`\nO Produto com ID ${produto.id} não foi encontrado!`)
        }
    }

    deletar(id: number): void {
        let buscaProduto = this.buscarNoArray(id)

        if (buscaProduto !== null) {
            this.listaProdutos.splice(this.listaProdutos.indexOf(buscaProduto), 1)
            console.log(`\nO Produto com ID ${id} foi apagado com sucesso!`)
        } else {
            console.log(`\nO Produto com ID ${id} não foi encontrado!`)
        }
    }

    // Métodos Auxiliares

    // gera um id novo a cada produto cadastrado
    public gerarId(): number {
        return ++this.id
    }

    // Busca um produto na lista pelo ID (usado no Atualizar e Deletar) 
    public buscarNoArray(id: number): Produto | null {
        for (let produto of this.listaProdutos) {
            if (produto.id === id)
                return produto
        }
        return null
    }
}