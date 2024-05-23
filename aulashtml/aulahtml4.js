import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

const HTMLLessonScreen4 = () => {
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
      title: 'Links e Âncoras',
      content: 'Links são usados para navegar entre páginas, enquanto âncoras permitem a navegação dentro da mesma página.',
      code: '<a href="https://www.exemplo.com">Link externo</a>\n<a href="#secao">Âncora</a>\n\n<h2 id="secao">Seção</h2>',
    },
    {
      id: '2',
      title: 'Meta Tags',
      content: 'As meta tags fornecem informações sobre a página para os mecanismos de busca e redes sociais.',
      code: '<meta name="description" content="Descrição da página">\n<meta property="og:title" content="Título da página">',
    },
    {
      id: '3',
      title: 'Formulários Avançados',
      content: 'HTML oferece elementos para criar formulários mais complexos, como seletores, caixas de seleção e campos de arquivo.',
      code: '<input type="text" name="fname">\n<select>\n  <option value="opcao1">Opção 1</option>\n  <option value="opcao2">Opção 2</option>\n</select>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula 4: Links, Meta Tags e Formulários Avançados</Text>
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

export default HTMLLessonScreen4;
