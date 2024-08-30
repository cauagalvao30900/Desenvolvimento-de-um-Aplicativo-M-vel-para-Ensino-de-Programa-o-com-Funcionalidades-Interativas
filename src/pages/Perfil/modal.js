import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const ProfileModal = ({ visible, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.medalsContainer}>
            {user.medals.map((medal, index) => (
              <Image key={index} source={{ uri: medal }} style={styles.medalImage} />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4747',
    borderRadius: 50,
    padding: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    color: '#FFF',
    fontSize: 20,
    marginVertical: 10,
  },
  medalsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  medalImage: {
    width: 30,
    height: 30,
    margin: 5,
  },
});

export default ProfileModal;
