import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { firestore, auth } from '../services/firebaseConfig'; // Certifique-se de que o caminho está correto
import { collection, addDoc } from 'firebase/firestore';

const Post = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    try {
      if (!title || !content) {
        Alert.alert('Erro', 'Título e conteúdo são obrigatórios');
        return;
      }

      const postsCollection = collection(firestore, 'posts');
      await addDoc(postsCollection, {
        title,
        content,
        userId: auth.currentUser.uid,
        timestamp: new Date(),
      });

      Alert.alert('Sucesso', 'Postagem adicionada com sucesso!');
      setTitle('');
      setContent('');
      navigation.goBack(); // Voltar para a tela de comunidade
    } catch (error) {
      console.error('Erro ao adicionar postagem: ', error);
      Alert.alert('Erro', 'Não foi possível adicionar a postagem. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Conteúdo"
        placeholderTextColor="#888"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Adicionar Postagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: '#fff',
    backgroundColor: '#333',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Post;
