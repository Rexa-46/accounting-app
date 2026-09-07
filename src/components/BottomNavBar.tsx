import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface BottomNavBarProps {
  isDarkMode: boolean;
  state: any;
  descriptors: any;
  navigation: any;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ state, descriptors, navigation, isDarkMode }) => {
  const { colors } = useTheme();

  const navItems = [
    { name: 'Home', label: 'خانه', icon: '🏠' },
    { name: 'Transactions', label: 'تراکنش‌ها', icon: '💱' },
    { name: 'Reports', label: 'گزارش‌ها', icon: '📈' },
    { name: 'Settings', label: 'تنظیمات', icon: '⚙️' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'white', borderTopColor: colors.borderColor }]}>
      {navItems.map((item, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={item.name}
            style={[styles.navItem, isFocused && { backgroundColor: '#e8f4f8' }]}
            onPress={() => navigation.navigate(item.name)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text
              style={[
                styles.label,
                { color: isFocused ? colors.primary : colors.textLight },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default BottomNavBar;
