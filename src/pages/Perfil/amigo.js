import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import { firestore, auth } from '../../../services/firebaseConfig';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, getDocs, where } from 'firebase/firestore';

const AmigosScreen = () => {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameToAdd, setUsernameToAdd] = useState('');
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser.uid;

    // Buscar amigos
    const friendsCollection = collection(firestore, 'users', userId, 'friends');
    const q = query(friendsCollection);

    const unsubscribeFriends = onSnapshot(q, (snapshot) => {
      const friendsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFriends(friendsData);
    }, (error) => {
      console.error('Erro ao buscar amigos: ', error);
    });

    // Buscar solicitações pendentes
    const requestsCollection = collection(firestore, 'users', userId, 'friendRequests');
    const qRequests = query(requestsCollection);

    const unsubscribeRequests = onSnapshot(qRequests, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingRequests(requestsData);
    }, (error) => {
      console.error('Erro ao buscar solicitações pendentes: ', error);
    });

    return () => {
      unsubscribeFriends();
      unsubscribeRequests();
    };
  }, []);

  const handleAcceptRequest = async (request) => {
    try {
      const userId = auth.currentUser.uid;
      const friendId = request.from;

      // Adicionar o novo amigo
      await setDoc(doc(firestore, 'users', userId, 'friends', friendId), {});

      // Adicionar o usuário à lista de amigos do novo amigo
      await setDoc(doc(firestore, 'users', friendId, 'friends', userId), {});

      // Remover a solicitação de amizade
      await deleteDoc(doc(firestore, 'users', userId, 'friendRequests', friendId));
      
      Alert.alert('Sucesso', 'Solicitação de amizade aceita.');
    } catch (error) {
      console.error('Erro ao aceitar solicitação: ', error);
      Alert.alert('Erro', 'Não foi possível aceitar a solicitação. Tente novamente.');
    }
  };

  const handleRejectRequest = async (request) => {
    try {
      const userId = auth.currentUser.uid;
      const friendId = request.from;

      // Remover a solicitação de amizade
      await deleteDoc(doc(firestore, 'users', userId, 'friendRequests', friendId));
      
      Alert.alert('Sucesso', 'Solicitação de amizade rejeitada.');
    } catch (error) {
      console.error('Erro ao rejeitar solicitação: ', error);
      Alert.alert('Erro', 'Não foi possível rejeitar a solicitação. Tente novamente.');
    }
  };

  const handleProfileClick = async (userId) => {
    try {
      const userDoc = await getDocs(doc(firestore, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSelectedUser(userData);
        setModalVisible(true);
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário: ', error);
      Alert.alert('Erro', 'Não foi possível buscar os dados do usuário. Tente novamente.');
    }
  };

  const handleAddFriend = async () => {
    if (!usernameToAdd.trim()) {
      Alert.alert('Erro', 'O nome de usuário não pode estar vazio.');
      return;
    }
    const userId = auth.currentUser.uid;
    try {
      // Procurar usuário pelo nome de usuário fornecido
      const usersCollection = collection(firestore, 'users');
      const q = query(usersCollection, where('username', '==', usernameToAdd));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const friendId = userDoc.id;

        // Enviar solicitação de amizade
        await setDoc(doc(firestore, 'users', friendId, 'friendRequests', userId), {
          from: userId,
          username: auth.currentUser.displayName,
          timestamp: new Date().toISOString()
        });

        // Adicionar solicitação de amizade à lista de solicitações enviadas
        await setDoc(doc(firestore, 'users', userId, 'sentRequests', friendId), {
          to: friendId,
          timestamp: new Date().toISOString()
        });

        Alert.alert('Sucesso', 'Solicitação de amizade enviada.');
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar amigo: ', error);
      Alert.alert('Erro', 'Não foi possível adicionar o amigo. Tente novamente.');
    } finally {
      setUsernameToAdd('');
      setAddFriendModalVisible(false);
    }
  };

  const renderFriend = ({ item }) => (
    <TouchableOpacity onPress={() => handleProfileClick(item.id)} style={styles.friendContainer}>
      <Image source={{ uri: item.photoURL }} style={styles.friendImage} />
      <Text style={styles.friendName}>{item.username}</Text>
    </TouchableOpacity>
  );

  const renderRequest = ({ item }) => (
    <View style={styles.requestContainer}>
      <Text style={styles.requestName}>{item.username} enviou uma solicitação.</Text>
      <TouchableOpacity onPress={() => handleAcceptRequest(item)} style={styles.acceptButton}>
        <Text style={styles.buttonText}>Aceitar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRejectRequest(item)} style={styles.rejectButton}>
        <Text style={styles.buttonText}>Rejeitar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Amigos</Text>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
      <Text style={styles.title}>Solicitações Pendentes</Text>
      <FlatList
        data={pendingRequests}
        renderItem={renderRequest}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={() => setAddFriendModalVisible(true)} style={styles.addButton}>
        <Text style={styles.buttonText}>Adicionar Amigo</Text>
      </TouchableOpacity>
      
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedUser && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedUser.photoURL }} style={styles.modalImage} />
              <Text style={styles.modalUsername}>{selectedUser.username}</Text>
              <Text style={styles.modalRewards}>Recompensas: {selectedUser.rewards}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      <Modal visible={addFriendModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={usernameToAdd}
              onChangeText={setUsernameToAdd}
              placeholder="Nome de usuário"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddFriend} style={styles.addButton}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddFriendModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  friendName: {
    fontSize: 16
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  requestName: {
    flex: 1,
    fontSize: 16
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff'
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  modalUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalRewards: {
    fontSize: 16,
    marginBottom: 10
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%'
  }
});

export default AmigosScreen;
