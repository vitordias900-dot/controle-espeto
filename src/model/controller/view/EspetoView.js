import { useEffect, useState } from "react"
import { Button, FlatList, Text, TextInput, View } from "react-native"
import { carregarProdutos, salvarProduto } from "../controller/EspetoController"

export default function EspetoView() {

  const [nome, setNome] = useState("")
  const [comprado, setComprado] = useState("")
  const [vendido, setVendido] = useState("")
  const [lista, setLista] = useState([])

  async function cadastrar() {

    const novaLista = await salvarProduto(nome, comprado, vendido)

    setLista(novaLista)

    setNome("")
    setComprado("")
    setVendido("")
  }

  async function carregar() {

    const dados = await carregarProdutos()

    setLista(dados)

  }

  useEffect(() => {
    carregar()
  }, [])

  return (

    <View style={{ padding: 30 }}>

      <Text>CONTROLE DO ESPETO</Text>

      <TextInput
        placeholder="Produto"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Quantidade Comprada"
        value={comprado}
        onChangeText={setComprado}
      />

      <TextInput
        placeholder="Quantidade Vendida"
        value={vendido}
        onChangeText={setVendido}
      />

      <Button
        title="Cadastrar Produto"
        onPress={cadastrar}
      />

      <FlatList
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <Text>
            {item.nome} | Comprado: {item.comprado} | Vendido: {item.vendido} | Sobra: {item.sobra} | Faturamento: R$ {item.faturamento}
          </Text>

        )}
      />

    </View>

  )

}