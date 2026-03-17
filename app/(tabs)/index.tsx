import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

// Definindo o tipo do produto
type Produto = {
  nome: string;
  comprado: number;
  vendido: number;
  sobra: number;
  faturamento: number;
};

export default function HomeScreen() {

  const [nome, setNome] = useState<string>("")
  const [comprado, setComprado] = useState<string>("")
  const [vendido, setVendido] = useState<string>("")
  const [lista, setLista] = useState<Produto[]>([])  // <- Tipado corretamente

  // Carregar produtos salvos ao abrir o app
  useEffect(() => {
    async function carregarProdutos() {
      const dados = await AsyncStorage.getItem('@produtos');
      if (dados) setLista(JSON.parse(dados));
    }
    carregarProdutos();
  }, []);

  // Função para cadastrar produto
  function cadastrarProduto() {
    const compradoNum = parseInt(comprado)
    const vendidoNum = parseInt(vendido)

    if (!nome || isNaN(compradoNum) || isNaN(vendidoNum)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const sobra = compradoNum - vendidoNum
    const faturamento = vendidoNum * 8

    const produto: Produto = { nome, comprado: compradoNum, vendido: vendidoNum, sobra, faturamento }

    const novaLista = [...lista, produto]
    setLista(novaLista)

    // Salvar no AsyncStorage
    AsyncStorage.setItem('@produtos', JSON.stringify(novaLista));

    // Limpar campos
    setNome("")
    setComprado("")
    setVendido("")

    // Fechar teclado automaticamente
    Keyboard.dismiss()
  }

  // Totais do dia
  const faturamentoTotal = lista.reduce((total, item) => total + item.faturamento, 0)
  const sobraTotal = lista.reduce((total, item) => total + item.sobra, 0)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        
        <Text style={styles.titulo}>CONTROLE DO ESPETO</Text>

        <Text style={styles.label}>Sabor :</Text>
        <TextInput
          placeholder="Digite o nome do produto"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Quantidade Comprada :</Text>
        <TextInput
          placeholder="Digite a quantidade comprada"
          style={styles.input}
          value={comprado}
          onChangeText={setComprado}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Quantidade Vendida :</Text>
        <TextInput
          placeholder="Digite a quantidade vendida"
          style={styles.input}
          value={vendido}
          onChangeText={setVendido}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botao} onPress={cadastrarProduto}>
          <Text style={styles.textoBotao}>Cadastrar Produto</Text>
        </TouchableOpacity>

        {/* Lista de produtos */}
        {lista.map((item, index) => (
          <Text key={index} style={styles.itemLista}>
            {item.nome} | Comprado: {item.comprado} | Vendido: {item.vendido} | Sobra: {item.sobra} | Faturamento: R$ {item.faturamento}
          </Text>
        ))}

        {/* Resumo do dia */}
        {lista.length > 0 && (
          <View style={styles.resumoContainer}>
            <Text style={styles.resumoTitulo}>Resumo do Dia:</Text>
            <Text style={styles.resumoItem}>Faturamento Total: R$ {faturamentoTotal}</Text>
            <Text style={styles.resumoItem}>Sobra Total: {sobraTotal}</Text>
          </View>
        )}

      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f2f2f2",
    padding:30,
    paddingTop:80
  },
  titulo:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:30,
    marginTop:40
  },
  label:{
    fontSize:16,
    marginBottom:5
  },
  input:{
    backgroundColor:"#fff",
    padding:12,
    borderRadius:8,
    marginBottom:20
  },
  botao:{
    backgroundColor:"#0048ff",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginBottom:30
  },
  textoBotao:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  },
  itemLista:{
    fontSize:16,
    marginBottom:5
  },
  resumoContainer:{
    marginTop:20,
    paddingTop:10,
    borderTopWidth:1,
    borderTopColor:"#ccc"
  },
  resumoTitulo:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:5
  },
  resumoItem:{
    fontSize:16,
    marginBottom:3
  }
})