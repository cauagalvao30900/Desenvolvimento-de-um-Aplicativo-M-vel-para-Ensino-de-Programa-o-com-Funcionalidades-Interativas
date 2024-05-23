import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs'; // ou outro estilo que preferir

const ReactLessonScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.lessonContent}>
      <Text style={styles.subtitle}>{item.title}</Text>
      <Text style={styles.paragraph}>{item.content}</Text>
      <View style={styles.codeBlock}>
        <SyntaxHighlighter language="javascript" style={docco}>
          {item.code}
        </SyntaxHighlighter>
      </View>
    </View>
  );

  const data = [
    {
      id: '1',
      title: 'Introdução ao React',
      content: 'React é uma biblioteca JavaScript popular para construção de interfaces de usuário interativas e reativas.',
      code: 'import React from \'react\';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, world!</h1>\n    </div>\n  );\n}\n\nexport default App;',
    },
    {
      id: '2',
      title: 'Renderizando com ReactDOM',
      content: 'Você pode renderizar componentes React em sua aplicação usando ReactDOM.render().',
      code: 'import ReactDOM from \'react-dom\';\nimport App from \'./App\';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById(\'root\')\n);',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula introdução de React</Text>
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
      marginHorizontal: 20,
      fontWeight: '400',
  },
  lessonContent: {
    marginBottom: 10,
    fontWeight: '400',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontWeight: '600',
    marginLeft: 70,
    marginRight: 70,
    textAlign: 'center', // Centraliza o texto
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center', // Centraliza o texto
  },
  codeBlock: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1, // Adiciona uma borda
    borderColor: '#ccc', // Cor da borda
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
});

export default ReactLessonScreen;
