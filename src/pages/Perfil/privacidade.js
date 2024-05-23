import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Política de Privacidade</Text>
        <Text style={styles.sectionTitle}>Coleta e Uso de Informações Pessoais</Text>
        <Text style={styles.paragraph}>
          Respeitamos a sua privacidade e estamos comprometidos em proteger suas informações pessoais.
          As informações fornecidas por você serão utilizadas para melhorar nossos serviços e
          personalizar sua experiência.
        </Text>
        <Text style={styles.paragraph}>
          Não compartilhamos suas informações pessoais com terceiros sem o seu consentimento,
          exceto quando necessário para fornecer um serviço solicitado por você.
        </Text>
        <Text style={styles.paragraph}>
          Podemos coletar e utilizar informações pessoais para os seguintes fins:
        </Text>
        <Text style={styles.listItem}>- Fornecer e manter nossos serviços</Text>
        <Text style={styles.listItem}>- Compreender e analisar o uso dos nossos serviços</Text>
        <Text style={styles.listItem}>- Personalizar sua experiência e fornecer conteúdo relevante</Text>
        <Text style={styles.listItem}>- Comunicar-se com você e responder às suas solicitações</Text>
        <Text style={styles.listItem}>- Proteger nossos direitos legais e evitar atividades fraudulentas</Text>
        <Text style={styles.sectionTitle}>Cookies</Text>
        <Text style={styles.paragraph}>
          Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso app e
          coletar informações sobre como você interage com nossos serviços. Você pode controlar o uso
          de cookies nas configurações do seu app.
        </Text>
        <Text style={styles.sectionTitle}>Segurança</Text>
        <Text style={styles.paragraph}>
          Estamos empenhados em proteger suas informações pessoais e adotamos medidas adequadas para
          garantir a segurança dos dados.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#075e54',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#128c7e',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 20,
    marginBottom: 5,
    color: '#333',
  },
});
