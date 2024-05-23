import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const SQLLessonScreen2 = () => {
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
      title: 'Restrições de Integridade',
      content: 'Restrições de integridade garantem a precisão e a consistência dos dados em um banco de dados.',
      code: 'ALTER TABLE tabela ADD CONSTRAINT nome_restrição condição;',
    },
    {
      id: '2',
      title: 'Chaves Primárias',
      content: 'Chaves primárias identificam exclusivamente cada registro em uma tabela.',
      code: 'CREATE TABLE tabela (\n  id INT PRIMARY KEY,\n  nome VARCHAR(255)\n);',
    },
    {
      id: '3',
      title: 'Chaves Estrangeiras',
      content: 'Chaves estrangeiras estabelecem uma relação entre duas tabelas.',
      code: 'CREATE TABLE tabela1 (\n  id INT PRIMARY KEY,\n  nome VARCHAR(255),\n  id_outro_tabela INT,\n  FOREIGN KEY (id_outro_tabela) REFERENCES outro_tabela(id)\n);',
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

export default SQLLessonScreen2;
