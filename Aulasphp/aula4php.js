import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const PHPLessonScreen4 = () => {
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
      title: 'Manipulação de Arquivos',
      content: 'PHP oferece funções para manipular arquivos no servidor.',
      code: '<?php\n$myfile = fopen("arquivo.txt", "r") or die("Impossível abrir o arquivo!");\necho fread($myfile, filesize("arquivo.txt"));\nfclose($myfile);\n?>',
    },
    {
      id: '2',
      title: 'Conexão com Banco de Dados',
      content: 'PHP pode se conectar a diferentes tipos de bancos de dados para armazenamento e recuperação de dados.',
      code: '<?php\n$servername = "localhost";\n$username = "username";\n$password = "password";\n$dbname = "myDB";\n// Cria conexão\n$conn = new mysqli($servername, $username, $password, $dbname);\n// Verifica conexão\nif ($conn->connect_error) {\n  die("Conexão falhou: " . $conn->connect_error);\n}\necho "Conexão bem-sucedida!";\n?>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quarta Aula de PHP</Text>
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

export default PHPLessonScreen4;
