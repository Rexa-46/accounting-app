import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface DrawerMenuProps {
  isDarkMode: boolean;
  navigation: any;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isDarkMode, navigation }) => {
  const { colors } = useTheme();

  const menuItems = [
    { label: 'خانه', icon: '🏠', screen: 'Home' },
    { label: 'تراکنش‌ها', icon: '💱', screen: 'Transactions' },
    { label: 'گزارش‌ها', icon: '📈', screen: 'Reports' },
    { label: 'تنظیمات', icon: '⚙️', screen: 'Settings' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textDark }]}>منو</Text>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.menuItem, { borderBottomColor: colors.borderColor }]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[styles.label, { color: colors.textDark }]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 20,
    marginLeft: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DrawerMenu;
