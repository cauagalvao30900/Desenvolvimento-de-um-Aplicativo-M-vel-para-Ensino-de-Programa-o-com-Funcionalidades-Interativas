import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
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
    route: 'exreact', // Adicionando a rota para a página ReactJS
  },
  {
    icon: 'code',
    title: 'PHP',
    subtitle: 'back end',
    route: 'exphp', // Adicionando a rota para a página PHP
  },
  {
    icon: 'database',
    title: 'SQL',
    subtitle: 'database',
    route: 'exsql', // Adicionando a rota para a página SQL
  },
  {
    icon: 'codepen',
    title: 'HTML',
    subtitle: 'Front End',
    route: 'exhtml', // Adicionando a rota para a página HTML
  },
];

const { width, height } = Dimensions.get('window');

export default function Example() {
  const [value, setValue] = React.useState(0);
  const navigation = useNavigation(); // Importando a função de navegação

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        source={{
          uri: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlzdWFsJTIwc3R1ZGlvJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D',
        }}
        resizeMode="cover"
      />
      <View style={[styles.background, styles.overflow]} />
      <View style={styles.content}>
        <Text style={styles.title}>
        exercícios de programação na sua linguagem favorita.
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
                    size={12} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              // Navegar para a página da opção selecionada
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
    backgroundColor: '#1b1d1b',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overflow: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 22,
    paddingRight: 40,

  },
  footer: {
    paddingVertical: 16,
  },
  /** Radio */
  radio: {
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
  radioIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#000',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  radioSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#878787',
  },
  radioCheck: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    marginLeft: 'auto',
    display: 'none',
  },
  radioCheckActive: {
    display: 'flex',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
