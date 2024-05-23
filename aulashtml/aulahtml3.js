import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const HTMLLessonScreen3 = () => {
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
      title: 'Elementos Semânticos',
      content: 'Elementos semânticos fornecem significado ao conteúdo da página.',
      code: '<header>\n  <h1>Meu cabeçalho</h1>\n</header>\n<nav>\n  <ul>\n    <li><a href="#">Link 1</a></li>\n    <li><a href="#">Link 2</a></li>\n  </ul>\n</nav>',
    },
    {
      id: '2',
      title: 'Tags de Áudio e Vídeo',
      content: 'As tags <audio> e <video> permitem incorporar áudio e vídeo diretamente na página.',
      code: '<audio controls>\n  <source src="caminho-do-audio.mp3" type="audio/mpeg">\n  Seu navegador não suporta o elemento de áudio.\n</audio>',
    },
    {
      id: '3',
      title: 'Formatação de Texto',
      content: 'HTML oferece várias tags para formatar texto, como <b>, <i>, <strong>, <em>, etc.',
      code: '<p><b>Texto em negrito</b> e <i>itálico</i>.</p>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula 3: Elementos Semânticos, Áudio/Vídeo e Formatação de Texto</Text>
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

export default HTMLLessonScreen3;
