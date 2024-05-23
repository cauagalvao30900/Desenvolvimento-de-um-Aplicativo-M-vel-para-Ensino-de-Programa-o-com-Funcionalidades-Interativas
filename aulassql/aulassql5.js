import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const SQLLessonScreen5 = () => {
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
      title: 'Subconsultas (Subqueries)',
      content: 'Subconsultas são consultas aninhadas dentro de uma consulta principal.',
      code: 'SELECT coluna1 FROM tabela WHERE coluna2 IN (SELECT coluna3 FROM outra_tabela);',
    },
    {
      id: '2',
      title: 'Transações',
      content: 'As transações SQL garantem que um conjunto de operações seja executado de forma segura e consistente.',
      code: 'START TRANSACTION;\nINSERT INTO tabela (coluna1) VALUES (valor);\nCOMMIT;',
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

export default SQLLessonScreen5;
