import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { firestore, auth } from '../services/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = ({ route, navigation }) => {
  const { userId, username } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesCollection = collection(firestore, 'messages');
    const q = query(messagesCollection, where('chatId', '==', createChatId(auth.currentUser.uid, userId)));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordenar as mensagens por timestamp para garantir que a ordem cronológica seja respeitada
      const sortedMessages = messagesData.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, [userId]);

  const createChatId = (uid1, uid2) => {
    return [uid1, uid2].sort().join('_');
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(firestore, 'messages'), {
        chatId: createChatId(auth.currentUser.uid, userId),
        senderId: auth.currentUser.uid,
        receiverId: userId,
        message: newMessage,
        timestamp: new Date(),
      });
      setNewMessage(''); // Limpar a caixa de texto após o envio da mensagem
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.senderId === auth.currentUser.uid ? styles.myMessage : styles.theirMessage]}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{username}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
      <TextInput
  style={styles.input}
  value={newMessage}
  onChangeText={setNewMessage}
  placeholder="Digite sua mensagem"
  placeholderTextColor="#FFF"  // Placeholder branco
  selectionColor="#FFF"  // Cor do cursor ao selecionar texto (branca)
  color="#FFF"  // Texto digitado em branco
/>

        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c3c3c',
  },
  header: {
    padding: 15,
    backgroundColor: '#3c3c3c',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Adicionando espaço no topo
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#565656',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#ffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffff',
    backgroundColor: '#3c3c3c',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#565656',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  
});

export default ChatScreen;
