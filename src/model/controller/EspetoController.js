import AsyncStorage from "@react-native-async-storage/async-storage"
import Produto from "../model/Produto"

const CHAVE = "PRODUTOS"

export async function salvarProduto(nome, comprado, vendido) {

  const produto = new Produto(nome, comprado, vendido)

  const dados = await AsyncStorage.getItem(CHAVE)

  let lista = dados ? JSON.parse(dados) : []

  lista.push(produto)

  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista))

  return lista
}

export async function carregarProdutos() {

  const dados = await AsyncStorage.getItem(CHAVE)

  return dados ? JSON.parse(dados) : []

}