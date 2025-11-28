import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [secureText, setSecureText] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFE7D9" barStyle="dark-content" />

        <View style={styles.header}>
          <Image
            source={require('../assets/SplashImg.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.card}>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#C7C7C7"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor="#C7C7C7"
              secureTextEntry={secureText}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Image
                source={require('../assets/eye-open.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.forgot}>Forgot password?</Text>

          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Don’t have an account?</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.activateBtn} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.activateText}>Activate Now</Text>
          </TouchableOpacity>

          <Text style={styles.version}>App ver 1.0</Text>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE7D9',
  },

  header: {
    alignItems: 'center',
    marginTop: 60,
  },

  logo: {
    width: 163,
    height: 163,
    resizeMode: 'contain',
    marginTop: 133
  },

  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  card: {
    width: '100%',
    height: 465,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
  },

  input: {
    height: 48,
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 14,
    fontSize: 14,
  },

  passwordBox: {
    height: 48,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputField: {
    flex: 1,
    fontSize: 14,
  },

  eyeIcon: {
    width: 18,
    height: 18,
    tintColor: '#666',
    resizeMode: 'contain'
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: 6,
    fontSize: 14,
    color: '#6B6D79',
    fontWeight: '500',
  },

  loginBtn: {
    height: 52,
    backgroundColor: '#FF6000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  divider: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    height: 1.4,
    backgroundColor: '#E3E3E3',
    flex: 0.5,
  },

  dividerText: {
    width: 173,
    height: 20,
    textAlign: 'center',
    color: '#BABCBF',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },

  activateBtn: {
    marginTop: 18,
    height: 52,
    borderRadius: 10,
    borderColor: '#FF6000',
    borderWidth: 1.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activateText: {
    color: '#FF6000',
    fontSize: 16,
    fontWeight: '700',
  },

  version: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
    color: '#6B6D79',
    fontWeight: '500',
  },
});
