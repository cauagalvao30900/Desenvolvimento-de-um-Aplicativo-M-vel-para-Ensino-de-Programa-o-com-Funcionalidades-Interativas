import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const SQLLessonScreen1 = () => {
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
      id: '1',
      title: 'Introdução ao SQL',
      content: 'SQL (Structured Query Language) é uma linguagem de consulta estruturada usada para interagir com bancos de dados relacionais.',
      code: '// Exemplo de código SQL\nSELECT * FROM tabela;',
    },
    {
      id: '2',
      title: 'Tipos de Dados',
      content: 'Os tipos de dados no SQL incluem INTEGER, VARCHAR, DATE, etc.',
      code: '// Exemplo de criação de tabela com tipos de dados\nCREATE TABLE tabela (\n  id INTEGER PRIMARY KEY,\n  nome VARCHAR(255),\n  data_nascimento DATE\n);',
    },
    {
      id: '3',
      title: 'Instruções Básicas',
      content: 'Instruções básicas incluem SELECT, INSERT, UPDATE e DELETE.',
      code: '// Exemplo de inserção de dados\nINSERT INTO tabela (nome, data_nascimento) VALUES ("João", "2000-01-01");',
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
    backgroundColor: '#ffffff',
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
  },
  lessonContent: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  codeBlock: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  codeText: {
    fontFamily: 'Courier New',
  },
});

export default SQLLessonScreen1;
