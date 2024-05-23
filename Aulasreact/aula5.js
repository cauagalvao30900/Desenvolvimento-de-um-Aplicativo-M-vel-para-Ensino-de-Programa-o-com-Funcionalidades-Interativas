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
      id: '11',
      title: 'Otimização de Desempenho',
      content: 'A otimização de desempenho é crucial para garantir uma experiência de usuário responsiva em aplicativos React. Isso pode incluir técnicas como lazy loading de componentes, memoização de componentes com React.memo(), utilizando PureComponent ou implementando shouldComponentUpdate() para evitar renderizações desnecessárias, e otimização de renderização com o uso de chaves adequadas em listas.',
      code: '',
    },
    {
      id: '12',
      title: 'Testes Automatizados',
      content: 'Os testes automatizados são essenciais para garantir a qualidade e a estabilidade do código em projetos React. Você pode realizar testes unitários com Jest e Enzyme para testar componentes individualmente, testes de integração para garantir que os componentes funcionem corretamente juntos, e testes de aceitação para simular a interação do usuário e validar o comportamento da aplicação.',
      code: '',
    },
    {
      id: '13',
      title: 'Internacionalização',
      content: 'A internacionalização (i18n) é importante para tornar seu aplicativo acessível a uma ampla variedade de usuários em diferentes idiomas e regiões. Você pode utilizar bibliotecas como react-i18next para gerenciar strings traduzíveis, formatos de data, números e outras necessidades de localização.',
      code: '',
    },
    {
      id: '14',
      title: 'Segurança',
      content: 'A segurança é uma consideração fundamental no desenvolvimento de aplicativos React, especialmente ao lidar com entrada de usuário e comunicação com servidores. Certifique-se de implementar práticas recomendadas de segurança, como validação de entrada, prevenção de XSS (Cross-Site Scripting) e CSRF (Cross-Site Request Forgery), autenticação e autorização robustas, e proteção contra ataques de injeção de código.',
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
