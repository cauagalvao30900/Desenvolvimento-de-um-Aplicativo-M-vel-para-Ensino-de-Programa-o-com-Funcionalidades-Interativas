// PostDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { firestore, auth } from '../services/firebaseConfig'; // Certifique-se de que o caminho está correto
import { collection, doc, onSnapshot, query, where, addDoc } from 'firebase/firestore';

const PostDetails = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Obter dados da postagem
    const postDocRef = doc(firestore, 'posts', postId);
    const unsubscribePost = onSnapshot(postDocRef, doc => {
      setPost({ id: doc.id, ...doc.data() });
    });

    // Obter comentários da postagem
    const commentsCollection = collection(firestore, 'comments');
    const q = query(commentsCollection, where('postId', '==', postId));
    const unsubscribeComments = onSnapshot(q, snapshot => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    });

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [postId]);

  const handleAddComment = async () => {
    try {
      await addDoc(collection(firestore, 'comments'), {
        postId,
        userId: auth.currentUser.uid,
        content: comment,
        timestamp: new Date(),
      });
      setComment('');
    } catch (error) {
      console.error('Erro ao adicionar comentário: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {post && (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.content}</Text>
          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text>{item.content}</Text>
              </View>
            )}
          />
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Adicionar comentário..."
          />
          <Button title="Comentar" onPress={handleAddComment} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  comment: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default PostDetails;
