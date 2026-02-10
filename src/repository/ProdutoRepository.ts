import { Produto } from "../model/Produto";

export interface ProdutoRepository {

    // metodos de crud
    procurarPorId(id: number): void;
    listarTodos(): void;
    cadastrar(produto: Produto): void;
    atualizar(produto: Produto): void;
    deletar(id: number): void;    
}
