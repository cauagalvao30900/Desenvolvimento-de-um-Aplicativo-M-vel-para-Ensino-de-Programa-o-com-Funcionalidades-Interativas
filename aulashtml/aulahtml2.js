import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const HTMLLessonScreen2 = () => {
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
      title: 'Formulários',
      content: 'Os formulários HTML permitem a coleta de dados dos usuários.',
      code: '<form>\n  <input type="text" name="fname">\n  <input type="submit" value="Enviar">\n</form>',
    },
    {
      id: '2',
      title: 'Multimídia',
      content: 'HTML suporta elementos para incorporar áudio e vídeo em páginas da web.',
      code: '<video width="320" height="240" controls>\n  <source src="video.mp4" type="video/mp4">\n  Seu navegador não suporta o elemento de vídeo.\n</video>',
    },
    {
      id: '3',
      title: 'Estilos e Layouts',
      content: 'CSS é usado para estilizar elementos HTML e controlar o layout da página.',
      code: '<style>\n  body {\n    background-color: lightblue;\n  }\n</style>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula 2: Formulários, Multimídia e Estilos</Text>
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

export default HTMLLessonScreen2;
