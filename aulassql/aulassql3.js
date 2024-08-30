import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs'; // ou outro estilo que preferir

const SQLLessonScreen3 = () => {
  const renderItem = ({ item }) => (
    <View style={styles.lessonContent}>
      <Text style={styles.subtitle}>{item.title}</Text>
      <Text style={styles.paragraph}>{item.content}</Text>
      <View style={styles.codeBlock}>
        <SyntaxHighlighter language="sql" style={docco}>
          {item.code}
        </SyntaxHighlighter>
      </View>
    </View>
  );

  const data = [
    {
      id: '35',
      title: 'Consulta Básica',
      content: 'A consulta básica SELECT é usada para recuperar dados de uma tabela.',
      code: 'SELECT coluna1, coluna2 FROM tabela WHERE condição;',
    },
    {
      id: '36',
      title: 'Ordenação e Filtro',
      content: 'ORDER BY é usado para classificar os resultados, e WHERE é usado para filtrar os resultados.',
      code: 'SELECT * FROM tabela ORDER BY coluna;',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula SQL</Text>
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
    alignItems: 'center',
  },
  codeText: {
    color: 'white', // Cor do texto do código
    fontFamily: 'Courier New',
  },
});

export default SQLLessonScreen3;
