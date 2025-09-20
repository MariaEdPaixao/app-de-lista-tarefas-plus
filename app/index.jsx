import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../src/services/firebaseConfig';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from '../src/components/LanguageToggleButton';
import ToggleButtonsContainer from '../src/components/ToggleButtonsContainer';

export default function LoginScreen() {
  // Hook do tema da aplicação
  const { colors } = useTheme();

  // Hook de internacionalização
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('@user');
      if (usuarioSalvo) router.push('/HomeScreen'); // Redireciona se o usuário já estiver logado
    };
    verificarUsuarioLogado();
  }, []);

  const handleLogin = () => {
    if (!email || !senha) return Alert.alert('Atenção', 'Preencha todos os campos!');
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        router.push('/HomeScreen');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert("Erro", "Verifique email e senha digitados.");
        }
      });
  };

  const esqueceuSenha = () => {
    if (!email) return alert("Digite o email para recuperar a senha");
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Enviado o email de recuperação"))
      .catch(() => alert("Erro ao enviar email. Verifique se o email está correto."));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ToggleButtonsContainer/>
      <Text style={[styles.titulo, { color: colors.text }]}>{t("login")}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder="E-mail"
        placeholderTextColor={colors.placeHolderTextColor}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder={t("password")}
        placeholderTextColor={colors.placeHolderTextColor}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={[styles.botao, { backgroundColor: colors.button }]} onPress={handleLogin}>
        <Text style={[styles.textoBotao, { color: colors.buttonText }]}>Login</Text>
      </TouchableOpacity>

      <Link href="CadastroScreen" style={[styles.link, { color: colors.text }]}>{t("signUp")}</Link>
      <Text onPress={esqueceuSenha} style={[styles.link, { color: colors.text }]}>{t("forgotPassword")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  // buttonsContainer style removed; now handled by ToggleButtonsContainer component
});