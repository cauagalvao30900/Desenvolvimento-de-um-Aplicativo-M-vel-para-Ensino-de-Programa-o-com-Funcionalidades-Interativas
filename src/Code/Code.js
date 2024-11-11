import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const items = [
  {
    icon: 'code',
    title: 'React JS',
    subtitle: 'React Native',
    route: 'exreact',
  },
  {
    icon: 'code',
    title: 'PHP',
    subtitle: 'back end',
    route: 'exphp',
  },
  {
    icon: 'database',
    title: 'SQL',
    subtitle: 'database',
    route: 'exsql',
  },
  {
    icon: 'codepen',
    title: 'HTML',
    subtitle: 'Front End',
    route: 'exhtml',
  },
];

const { width } = Dimensions.get('window');

export default function Example() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Escolha a linguagem para seus exercícios de programação:
        </Text>
        {items.map(({ icon, title, subtitle, route }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(route); // Navega diretamente para a tela
              }}>
              <View style={styles.radio}>
                <View style={styles.radioIcon}>
                  <FeatherIcon color="#fff" name={icon} size={20} />
                </View>

                <View>
                  <Text style={styles.radioTitle}>{title}</Text>
                  <Text style={styles.radioSubtitle}>{subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#545454',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 22,
    textAlign: 'center',
  },
  radio: {
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#363636',
    width: width - 30,
  },
  radioIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'black',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  radioSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
});
