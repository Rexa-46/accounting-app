import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const TransactionScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      <View style={styles.placeholder}>
        <Text style={[styles.text, { color: colors.textDark }]}>صفحه تراکنش‌ها</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TransactionScreen;