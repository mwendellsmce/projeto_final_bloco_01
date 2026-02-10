import { Produto } from "./Produto";

export class Jogo extends Produto {

    private _genero: string;

    constructor(id: number, nome: string, tipo: number, preco: number, marca: string, genero: string) {
        super(id, nome, tipo, preco, marca);

        this._genero = genero;
    }

    public get genero(): string {
        return this._genero;
    }

    public set genero(value: string) {
        this._genero = value;
    }

    public visualizar(): void {
        super.visualizar();
        console.log(`Gênero: ${this._genero}`);
    }
}