import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  isDarkMode: boolean;
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <TouchableOpacity onPress={() => navigation?.openDrawer?.()}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.title}>حسابداری</Text>
        <Text style={styles.version}>4.6.9</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>🎤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  menuIcon: {
    fontSize: 20,
    color: 'white',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  version: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    fontSize: 18,
    color: 'white',
  },
});

export default Header;
