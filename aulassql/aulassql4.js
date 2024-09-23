import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const SQLLessonScreen4 = () => {
  const renderItem = ({ item }) => (
    <View style={styles.lessonContent}>
      <Text style={styles.subtitle}>{item.title}</Text>
      <Text style={styles.paragraph}>{item.content}</Text>
      <View style={styles.codeBlock}>
        <Text style={styles.codeText}>{item.code}</Text>
      </View>
    </View>
  );

  const data = [
    {
      id: '37',
      title: 'Junção de Tabelas (JOIN)',
      content: 'O comando JOIN é utilizado para combinar registros de duas ou mais tabelas em um resultado.',
      code: 'SELECT coluna1, coluna2 FROM tabela1 JOIN tabela2 ON tabela1.chave = tabela2.chave;',
    },
    {
      id: '38',
      title: 'Funções de Agregação',
      content: 'As funções de agregação são usadas para realizar cálculos em um conjunto de valores e retornar um único valor de resumo.',
      code: 'SELECT COUNT(coluna) AS total FROM tabela;',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula de SQL</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434', // Cor de fundo atualizada
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  lessonContent: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  codeBlock: {
    backgroundColor: '#1e1e1e', // Cor de fundo do bloco de código
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  codeText: {
    color: 'white', // Cor do texto do código
    fontFamily: 'Courier New',
  },
});

export default SQLLessonScreen4;
