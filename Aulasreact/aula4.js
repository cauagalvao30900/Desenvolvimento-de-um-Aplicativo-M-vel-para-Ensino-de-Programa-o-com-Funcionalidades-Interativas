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
      id: '7',
      title: 'Context API',
      content: 'A Context API é uma característica do React que permite compartilhar dados globalmente dentro de uma árvore de componentes, sem a necessidade de passar props manualmente em cada nível. ',
      code: 'const ThemeContext = React.createContext(\'light\');\n\nconst App = () => {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n};\n\nconst Toolbar = () => {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n};\n\nconst ThemedButton = () => {\n  const theme = useContext(ThemeContext);\n\n  return (\n    <button style={{ background: theme }}>Click me</button>\n  );\n};',
    },
    {
      id: '8',
      title: 'Renderização Condicional',
      content: 'A renderização condicional no React permite exibir diferentes componentes ou elementos com base em uma condição. Isso é útil para criar interfaces dinâmicas que respondem a diferentes estados de dados ou eventos.',
      code: 'const Greeting = ({ isLoggedIn }) => {\n  if (isLoggedIn) {\n    return <UserGreeting />;\n  }\n  return <GuestGreeting />;\n};',
    },
    {
      id: '9',
      title: 'Roteamento',
      content: '   O roteamento no React facilita a navegação entre páginas em uma aplicação web. O React Router, uma biblioteca popular, simplifica a implementação de navegação declarativa e baseada em componentes.',
      code: 'import { BrowserRouter as Router, Route, Link } from \'react-router-dom\';\n\nconst App = () => {\n  return (\n    <Router>\n      <div>\n        <nav>\n          <ul>\n            <li>\n              <Link to="/">Home</Link>\n            </li>\n            <li>\n              <Link to="/about">About</Link>\n            </li>\n            <li>\n              <Link to="/contact">Contact</Link>\n            </li>\n          </ul>\n        </nav>\n\n        <Route path="/" exact component={Home} />\n        <Route path="/about" component={About} />\n        <Route path="/contact" component={Contact} />\n      </div>\n    </Router>\n  );\n};',
    },
    {
      id: '10',
      title: 'Boas Práticas de Organização de Código',
      content: 'É importante manter o código bem organizado para facilitar a manutenção e escalabilidade de um projeto React. Isso inclui separar componentes em arquivos individuais, seguir convenções de nomenclatura, agrupar arquivos por funcionalidade e utilizar padrões de arquitetura adequados, como Flux ou Redux, para gerenciar o estado da aplicação.',
      code: '',
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
