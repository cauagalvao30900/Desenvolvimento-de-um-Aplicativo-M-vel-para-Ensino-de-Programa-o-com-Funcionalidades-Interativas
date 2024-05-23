import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const PHPLessonScreen = () => {
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
      title: 'Variáveis',
      content: 'Neste exemplo, definimos duas variáveis: $nome e $idade.',
      code: '<?php\n$nome = \'João\';\n$idade = 25;\necho "O valor de $nome é: $nome";\necho "O valor de $idade é: $idade";\n?>',
    },
    {
      id: '2',
      title: 'Estruturas de Controle',
      content: 'Vamos ver um exemplo de estrutura condicional:',
      code: '<?php\n$idade = 18;\nif ($idade >= 18) {\n  echo "Você é maior de idade.";\n} else {\n  echo "Você é menor de idade.";\n}\n?>',
    },
    {
      id: '3',
      title: 'Loop',
      content: 'Aqui está um exemplo de um loop:',
      code: '<?php\necho "Contagem regressiva de 5:";\nfor ($i = 5; $i >= 1; $i--) {\n  echo "$i ";\n}\n?>',
    },
    {
      id: '4',
      title: 'Funções',
      content: 'Vamos definir uma função simples para adicionar dois números:',
      code: '<?php\nfunction adicionar($a, $b) {\n  return $a + $b;\n}\n$num1 = 5;\n$num2 = 3;\necho "O resultado da adição de $num1 e $num2 é: " . adicionar($num1, $num2);\n?>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Aula PHP</Text>
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

export default PHPLessonScreen;
