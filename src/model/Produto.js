export default class Produto {

  constructor(nome, comprado, vendido) {

    this.nome = nome
    this.comprado = parseInt(comprado)
    this.vendido = parseInt(vendido)

    this.sobra = this.comprado - this.vendido
    this.faturamento = this.vendido * 8

  }

}