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
      id: '2',
      title: 'Componentes e Props',
      content: 'No React, componentes são elementos reutilizáveis que representam partes da interface do usuário, aceitando propriedades para configurar sua aparência e comportamento.aa',
      code: 'const Greeting = (props) => {\n  return <h1>Hello, {props.name}!</h1>;\n};\n\nconst App = () => {\n  return (\n    <div>\n      <Greeting name="World" />\n    </div>\n  );\n};',
    },
    {
      id: '3',
      title: 'Estado (State)',
      content: 'Os componentes React podem gerenciar um estado interno usando o hook useState() para funcionais ou this.state para classes, permitindo armazenar dados mutáveis que influenciam a renderização.',
      code: 'import React, { useState } from \'react\';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Você clicou {count} vezes</p>\n      <button onClick={() => setCount(count + 1)}>Clique aqui</button>\n    </div>\n  );\n};',
    },
    {
      id: '4',
      title: 'Componentes Funcionais ',
      content: 'No React, componentes podem ser funções simples ou classes mais complexas. As funções são mais diretas, enquanto as classes oferecem recursos avançados como estado local e ciclo de vida. ',
      code: 'import React from \'react\';\n\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula de React</Text>
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
