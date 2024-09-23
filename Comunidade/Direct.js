import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { firestore } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InboxScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversation}
      onPress={() => navigation.navigate('notificacao', { userId: item.id, username: item.username })}
    >
      <Image 
        source={{ uri: item.userProfilePic || 'https://via.placeholder.com/50' }} 
        style={styles.profilePic} 
        onError={() => console.log('Erro ao carregar imagem de perfil')} // Tratamento de erro
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.lastMessage}>Clique para enviar uma mensagem direta</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="#ffff" />
      </TouchableOpacity>
      
      {/* Logo no centro superior */}
      <Image 
        source={require('../assets/tech.png')} // Substitua pelo caminho da sua logo
        style={styles.logo} 
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c3c3c',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  conversation: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#152',
    backgroundColor: '#565656',
    borderRadius: 10,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#ccc', // Adicionei uma cor de fundo enquanto a imagem carrega
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
  },
  lastMessage: {
    fontSize: 14,
    color: '#00ffff',
  },
});

export default InboxScreen;
