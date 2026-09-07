import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const LoginScreen: React.FC = () => {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Connect to auth service
      Alert.alert('موفق', 'با موفقیت وارد شدید');
    } catch (error) {
      Alert.alert('خطا', 'خطای ورود');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Connect to auth service
      Alert.alert('موفق', 'حساب کاربری ایجاد شد');
      setIsSignUp(false);
    } catch (error) {
      Alert.alert('خطا', 'خطای ثبت‌نام');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>حسابداری</Text>
          <Text style={styles.subtitle}>نسخه 4.6.9</Text>
        </View>

        {isSignUp ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.textDark }]}>ثبت‌نام</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="نام"
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="ایمیل"
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="رمز عبور"
              placeholderTextColor={colors.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>ثبت‌نام</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSignUp(false)}>
              <Text style={[styles.toggleText, { color: colors.primary }]}>بازگشت به ورود</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: colors.textDark }]}>ورود</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="نام کاربری یا ایمیل"
              placeholderTextColor={colors.textLight}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="رمز عبور"
              placeholderTextColor={colors.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>ورود</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSignUp(true)}>
              <Text style={[styles.toggleText, { color: colors.primary }]}>ثبت‌نام</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#95a5a6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#2c3e50',
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;