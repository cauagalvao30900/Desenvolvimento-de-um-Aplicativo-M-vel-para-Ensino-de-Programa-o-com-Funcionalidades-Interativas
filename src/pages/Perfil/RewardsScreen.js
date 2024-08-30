import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore, auth } from '../../../services/firebaseConfig';
import { collection, query, onSnapshot, doc } from 'firebase/firestore';

const SentRequestsScreen = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const sentRequestsCollection = collection(firestore, 'users', userId, 'sentRequests');
    const q = query(sentRequestsCollection);

    const unsubscribeSentRequests = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSentRequests(requestsData);
    }, (error) => {
      console.error('Erro ao buscar solicitações enviadas: ', error);
    });

    return () => {
      unsubscribeSentRequests();
    };
  }, []);

  const renderRequest = ({ item }) => (
    <View style={styles.requestContainer}>
      <Text style={styles.requestText}>Solicitação enviada para {item.to}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitações Enviadas</Text>
      <FlatList
        data={sentRequests}
        keyExtractor={item => item.id}
        renderItem={renderRequest}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma solicitação enviada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  requestContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  requestText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default SentRequestsScreen;
