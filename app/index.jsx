import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { auth } from '../src/services/firebaseConfig';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // OAuth Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "270006469588-8lsac0h72jbmj6emvt4ci4pt7l582jrs.apps.googleusercontent.com",  // para desenvolvimento no Expo Go
    iosClientId: "270006469588-k9aed76uechg6udtndhb4e8pimetb9sg.apps.googleusercontent.com",
    androidClientId: "270006469588-98vg41mvsrjaqa2mqh4bpckbprci2fgo.apps.googleusercontent.com",
    webClientId: "270006469588-8lsac0h72jbmj6emvt4ci4pt7l582jrs.apps.googleusercontent.com",    // pega do Firebase
  });

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('@user');
      if (usuarioSalvo) router.push('/HomeScreen');
    };
    verificarUsuarioLogado();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (result) => {
          const user = result.user;
          await AsyncStorage.setItem('@user', JSON.stringify(user));
          router.push('/HomeScreen');
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Erro", "Não foi possível fazer login com o Google.");
        });
    }
  }, [response]);

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
        } else {
          Alert.alert("Erro", error.message);
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
      <ThemeToggleButton />

      <Text style={[styles.titulo, { color: colors.text }]}>Login</Text>

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
        placeholder="Senha"
        placeholderTextColor={colors.placeHolderTextColor}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={[styles.botao, { backgroundColor: colors.button }]} onPress={handleLogin}>
        <Text style={[styles.textoBotao, { color: colors.buttonText }]}>Login</Text>
      </TouchableOpacity>

      {/* Botão Google */}
      <TouchableOpacity 
        style={[styles.botao, { backgroundColor: "#4285F4", marginTop: 10 }]} 
        onPress={() => promptAsync()} 
        disabled={!request}
      >
        <Text style={[styles.textoBotao, { color: "white" }]}>Entrar com Google</Text>
      </TouchableOpacity>

      <Link href="CadastroScreen" style={[styles.link, { color: colors.text }]}>Cadastre-se</Link>
      <Text onPress={esqueceuSenha} style={[styles.link, { color: colors.text }]}>Esqueceu a senha?</Text>
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
  }
});