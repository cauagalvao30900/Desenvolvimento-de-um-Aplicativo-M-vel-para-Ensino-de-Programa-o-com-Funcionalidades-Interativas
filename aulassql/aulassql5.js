import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SQLLessonScreen5 = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    Alert.alert(
      isFavorited ? 'Removido dos Favoritos' : 'Adicionado aos Favoritos',
      isFavorited ? 'A lição foi removida dos favoritos.' : 'A lição foi adicionada aos favoritos.'
    );
  };

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
      id: '39',
      title: 'Subconsultas (Subqueries)',
      content: 'Subconsultas são consultas aninhadas dentro de uma consulta principal.',
      code: 'SELECT coluna1 FROM tabela WHERE coluna2 IN (SELECT coluna3 FROM outra_tabela);',
    },
    {
      id: '40',
      title: 'Transações',
      content: 'As transações SQL garantem que um conjunto de operações seja executado de forma segura e consistente.',
      code: 'START TRANSACTION;\nINSERT INTO tabela (coluna1) VALUES (valor);\nCOMMIT;',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aula de SQL</Text>
        <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
          <FontAwesome
            name={isFavorited ? 'star' : 'star-o'}
            size={24}
            color={isFavorited ? '#FFD700' : '#fff'}
          />
        </TouchableOpacity>
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
    backgroundColor: '#343434', // Cor de fundo atualizada
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  favoriteButton: {
    padding: 10,
  },
  lessonContent: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  codeBlock: {
    backgroundColor: '#1e1e1e', // Cor de fundo do bloco de código
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#666', // Cor da borda do bloco de código
  },
  codeText: {
    color: 'white', // Cor do texto do código
    fontFamily: 'Courier New',
  },
});

export default SQLLessonScreen5;
