import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const HTMLLessonScreen1 = () => {
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
      title: 'Introdução ao HTML',
      content: 'HTML (HyperText Markup Language) é a linguagem padrão para criar páginas da web.',
      code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Título da página</title>\n  </head>\n  <body>\n    <h1>Meu primeiro título</h1>\n    <p>Meu primeiro parágrafo.</p>\n  </body>\n</html>',
    },
    {
      id: '2',
      title: 'Elementos Básicos',
      content: 'Elementos básicos incluem tags como <h1>, <p>, <a>, <img>, etc.',
      code: '<h1>Título</h1>\n<p>Parágrafo</p>\n<a href="https://www.exemplo.com">Link</a>',
    },
    {
      id: '3',
      title: 'Listas e Tabelas',
      content: 'HTML suporta diferentes tipos de listas e tabelas para organizar dados.',
      code: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n<table>\n  <tr>\n    <td>Célula 1</td>\n    <td>Célula 2</td>\n  </tr>\n</table>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula 1: Introdução ao HTML</Text>
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

export default HTMLLessonScreen1;
