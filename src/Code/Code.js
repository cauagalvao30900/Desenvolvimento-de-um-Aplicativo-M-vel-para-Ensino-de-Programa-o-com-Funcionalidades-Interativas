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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
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
  const [value, setValue] = React.useState(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Escolha a linguagem para seus exercícios de programação:
        </Text>
        {items.map(({ icon, title, subtitle, route }, index) => {
          const isActive = value === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setValue(index);
              }}>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                <View style={styles.radioIcon}>
                  <FeatherIcon color="#fff" name={icon} size={20} />
                </View>

                <View>
                  <Text style={styles.radioTitle}>{title}</Text>
                  <Text style={styles.radioSubtitle}>{subtitle}</Text>
                </View>

                <View
                  style={[
                    styles.radioCheck,
                    isActive && styles.radioCheckActive,
                  ]}>
                  <FontAwesome
                    color="#fff"
                    name="check"
                    size={12}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(items[value].route);
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  footer: {
    paddingVertical: 16,
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
  radioActive: {
    backgroundColor: '#363636',
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
  radioCheck: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ffff',
    marginLeft: 'auto',
    display: 'none',
  },
  radioCheckActive: {
    display: 'flex',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#00ffff',
    borderColor: '#00ffff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#363636',
  },
});
