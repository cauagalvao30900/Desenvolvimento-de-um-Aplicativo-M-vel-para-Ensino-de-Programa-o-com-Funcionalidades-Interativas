import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity, Modal } from 'react-native';
import { firestore, auth, storage } from '../services/firebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Comunidade = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('React');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const getUsernameFromEmail = (email) => {
    return email ? email.split('@')[0] : 'Usuário';
  };

  useEffect(() => {
    const postsCollection = collection(firestore, 'posts');
    const q = query(postsCollection, where('topic', '==', selectedTopic), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, [selectedTopic]);

  const handleAddPost = async () => {
    if (!newPostContent && !selectedImage) {
      Alert.alert('Erro', 'Por favor, digite uma mensagem ou selecione uma imagem');
      return;
    }

    try {
      let imageUrl = null;

      if (selectedImage) {
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();
        const filename = new Date().toISOString() + '.jpg';
        const imageRef = ref(storage, 'images/' + filename);

        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(firestore, 'posts'), {
        content: newPostContent,
        userId: auth.currentUser.uid,
        username: getUsernameFromEmail(auth.currentUser.email),
        userProfilePic: auth.currentUser.photoURL || 'https://via.placeholder.com/40', 
        topic: selectedTopic,
        timestamp: new Date(),
        imageUrl: imageUrl || null,
        replyTo: replyingTo ? replyingTo.id : null,
      });

      setNewPostContent('');
      setSelectedImage(null);
      setReplyingTo(null); 
    } catch (error) {
      console.error('Erro ao adicionar mensagem: ', error);
    }
  };

  const handleReportPost = (postId) => {
    Alert.alert(
      'Denunciar Postagem',
      'Deseja realmente denunciar esta postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Denunciar', onPress: () => console.log(`Postagem denunciada: ${postId}`) },
      ],
      { cancelable: true }
    );
  };

  const handleReply = (post) => {
    setSelectedPost(post);
    setReplyingTo(post);
    setModalVisible(true);
  };

  const handleReplySubmit = async () => {
    if (!replyContent) {
      Alert.alert('Erro', 'Digite uma mensagem para responder.');
      return;
    }

    try {
      await addDoc(collection(firestore, 'posts'), {
        content: replyContent,
        userId: auth.currentUser.uid,
        username: getUsernameFromEmail(auth.currentUser.email),
        userProfilePic: auth.currentUser.photoURL || 'https://via.placeholder.com/40',
        topic: replyingTo.topic,
        timestamp: new Date(),
        replyTo: replyingTo.id,
      });

      setReplyContent('');
      setModalVisible(false);
      setReplyingTo(null);
    } catch (error) {
      console.error('Erro ao responder mensagem: ', error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.userId === auth.currentUser.uid ? styles.right : styles.left]}>
      {item.userId !== auth.currentUser.uid && (
        <Image source={{ uri: item.userProfilePic || 'https://via.placeholder.com/40' }} style={styles.profilePic} />
      )}
      <View style={[styles.messageBubble, item.userId === auth.currentUser.uid ? styles.myMessage : styles.theirMessage]}>
        <View style={styles.headerContainer}>
          {item.userId !== auth.currentUser.uid && (
            <Text style={styles.username}>{item.username || 'Usuário'}</Text>
          )}
          {item.userId !== auth.currentUser.uid && (
            <TouchableOpacity onPress={() => handleReply(item)}>
              <Icon name="more-vert" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        {item.replyTo && (
          <View style={styles.replyContainer}>
            <Text style={styles.replyText}>Respondendo a:</Text>
            {posts.find(post => post.id === item.replyTo) && (
              <Text style={styles.replyContent}>{posts.find(post => post.id === item.replyTo).content}</Text>
            )}
          </View>
        )}
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="contain" />
        )}
        <Text style={styles.messageContent}>{item.content || ''}</Text>
      </View>
    </View>
  );

  const topics = ['React', 'PHP', 'SQL', 'HTML'];
  const colors = ['#3498db', '#9b59b6', '#f1c40f', '#ff4700'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.topicsContainer}>
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={topic}
            style={[styles.pill, { backgroundColor: colors[index] }]}
            onPress={() => setSelectedTopic(topic)}
          >
            <Text style={styles.pillText}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exibindo o tópico atual */}
      <View style={styles.currentTopicContainer}>
        <Text style={styles.currentTopicText}>Você está em: {selectedTopic}</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        inverted
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newPostContent}
            onChangeText={setNewPostContent}
            placeholder="Digite sua mensagem"
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity onPress={handlePickImage} style={styles.imagePickerButton}>
            <Icon name="add-photo-alternate" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddPost} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        {selectedImage && (
          <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              handleReportPost(selectedPost.id);
              setModalVisible(false);
            }}>
              <Text style={[styles.modalButton, styles.reportButton]}>Denunciar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              setReplyContent('');
            }}>
              <Text style={[styles.modalButton, styles.replyButton]} onPress={() => handleReplySubmit()}>Responder</Text>
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
    backgroundColor: '#343434',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  topicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginTop: 70, // Deixando espaço para o botão de voltar
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  pillText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentTopicContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  currentTopicText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#0084ff',
  },
  theirMessage: {
    backgroundColor: '#565656',
  },
  messageContent: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#444',
    backgroundColor: '#343434',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePickerButton: {
    marginLeft: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    fontSize: 18,
    marginVertical: 10,
    color: '#fff',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  reportButton: {
    color: 'red',
  },
  replyButton: {
    color: '#00bfff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
    color: '#fff',
  },
  replyContainer: {
    backgroundColor: '#555',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  replyText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  replyContent: {
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default Comunidade;
