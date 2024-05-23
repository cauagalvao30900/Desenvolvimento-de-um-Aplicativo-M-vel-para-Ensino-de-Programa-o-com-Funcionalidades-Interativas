import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const PHPLessonScreen3 = () => {
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
      title: 'Formulários HTML',
      content: 'HTML fornece elementos para criar formulários interativos.',
      code: '<form action="process.php" method="post">\n  Nome: <input type="text" name="nome"><br>\n  Email: <input type="email" name="email"><br>\n  <input type="submit" value="Enviar">\n</form>',
    },
    {
      id: '2',
      title: 'Processamento de Formulários em PHP',
      content: 'Os dados do formulário são enviados para um script PHP para processamento.',
      code: '<?php\nif ($_SERVER["REQUEST_METHOD"] == "POST") {\n  $nome = $_POST["nome"];\n  $email = $_POST["email"];\n  echo "Nome: $nome<br>";\n  echo "Email: $email";\n}\n?>',
    },
    {
      id: '3',
      title: 'Validação de Entrada',
      content: 'É importante validar e sanitizar os dados do formulário para evitar ataques.',
      code: '<?php\n$nome = test_input($_POST["nome"]);\n$email = test_input($_POST["email"]);\nfunction test_input($data) {\n  $data = trim($data);\n  $data = stripslashes($data);\n  $data = htmlspecialchars($data);\n  return $data;\n}\n?>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Aula  PHP</Text>
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

export default PHPLessonScreen3;
