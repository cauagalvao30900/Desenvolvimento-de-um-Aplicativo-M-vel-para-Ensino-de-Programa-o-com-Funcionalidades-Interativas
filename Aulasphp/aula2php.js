import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const PHPLessonScreen2 = () => {
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
      title: 'Arrays',
      content: 'Os arrays em PHP podem armazenar vários valores em uma única variável.',
      code: '<?php\n$frutas = array("Maçã", "Banana", "Laranja");\necho "Eu gosto de " . $frutas[0] . ", " . $frutas[1] . " e " . $frutas[2];\n?>',
    },
    {
      id: '2',
      title: 'Loop For Each',
      content: 'O loop foreach é usado para percorrer arrays.',
      code: '<?php\n$frutas = array("Maçã", "Banana", "Laranja");\nforeach ($frutas as $fruta) {\n  echo $fruta . " ";\n}\n?>',
    },
    {
      id: '3',
      title: 'Incluir Arquivos',
      content: 'A declaração include é usada para incluir arquivos em um script PHP.',
      code: '<?php\ninclude \'header.php\';\n?>',
    },
    {
      id: '4',
      title: 'Funções de Data e Hora',
      content: 'PHP oferece uma variedade de funções para manipular datas e horas.',
      code: '<?php\necho "Hoje é " . date("d/m/Y") . "<br>";\necho "A hora atual é " . date("h:i:sa");\n?>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Segunda Aula de PHP</Text>
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

export default PHPLessonScreen2;
