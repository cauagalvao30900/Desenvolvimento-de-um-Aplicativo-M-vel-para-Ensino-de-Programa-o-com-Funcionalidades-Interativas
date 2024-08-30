// Notificação.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore, auth } from '../services/firebaseConfig'; // Ajuste o caminho conforme necessário

const Notificação = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('notifications')
      .where('userId', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const notificationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(notificationsData);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Ajuste a cor de fundo conforme necessário
  },
  notification: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Notificação;
