// src/screens/UpdatesScreen.js
import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const updates = [
  { id: '1', title: 'Remoção de Tela de Tutorial', date: '2024-08-20', description: 'Removida a tela de tutorial inicial que não estava mais em uso.' },
  { id: '2', title: 'Correção de Bugs no Login', date: '2024-08-15', description: 'Corrigido problema de autenticação na tela de login.' },
  { id: '3', title: 'Modificações de Cor na Tela Principal', date: '2024-08-10', description: 'Alteradas as cores de fundo e dos botões para melhorar a visibilidade.' },
  { id: '4', title: 'Melhorias no Layout da Página de Aulas', date: '2024-07-25', description: 'Ajustado o layout para melhor compatibilidade com dispositivos móveis.' },
  { id: '5', title: 'Atualização do Design do Menu', date: '2024-06-30', description: 'Atualizado o design do menu para uma interface mais intuitiva.' },
  { id: '6', title: 'Adição de Aba Comunidade e Video Aulas', date: '2024-08-25', description: 'Foi adicionada uma nova aba para comunidade e uma seção de video aulas no app.' },
  // Adicione mais atualizações conforme necessário
];

export default function UpdatesScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.updateCard}>
      <View style={styles.iconContainer}>
        <Icon name="notifications-outline" size={24} color="#00ffff" />
      </View>
      <View style={styles.updateContent}>
        <Text style={styles.updateTitle}>{item.title}</Text>
        <Text style={styles.updateDate}>{item.date}</Text>
        <Text style={styles.updateDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Últimas Atualizações</Text>
      </View>
      <FlatList
        data={updates}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d1b',
  },
  header: {
    padding: 20,
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#00ffff',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  updateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  updateDate: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
  updateDescription: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333',
    borderTopWidth: 1,
    borderTopColor: '#00ffff',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});
