import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen: React.FC = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [username, setUsername] = useState('سارا احمدی');
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [currency, setCurrency] = useState('IRR');
  const [language, setLanguage] = useState('fa');

  const settingsGroups = [
    {
      title: 'پروفایل کاربری',
      items: [
        {
          label: 'نام کاربری',
          value: username,
          icon: '👤',
          onPress: () => setShowProfileModal(true),
        },
        {
          label: 'تنظیمات حساب',
          icon: '⚙️',
          onPress: () => Alert.alert('تنظیمات حساب', 'صفحه تنظیمات حساب در حال توسعه است'),
        },
      ],
    },
    {
      title: 'امنیت',
      items: [
        {
          label: 'قفل امنیتی',
          value: '',
          icon: '🔒',
          toggle: true,
          onToggle: () => Alert.alert('قفل امنیتی', 'فعال/غیرفعال شد'),
        },
        {
          label: 'اثر انگشت',
          value: biometric ? 'فعال' : 'غیرفعال',
          icon: '👆',
          toggle: true,
          toggleValue: biometric,
          onToggle: () => setBiometric(!biometric),
        },
        {
          label: 'تغییر رمز عبور',
          icon: '🔑',
          onPress: () => Alert.alert('تغییر رمز', 'صفحه تغییر رمز در حال توسعه است'),
        },
      ],
    },
    {
      title: 'نمایش و طراحی',
      items: [
        {
          label: 'حالت شب',
          value: isDarkMode ? 'فعال' : 'غیرفعال',
          icon: '🌙',
          toggle: true,
          toggleValue: isDarkMode,
          onToggle: () => toggleTheme?.(!isDarkMode),
        },
        {
          label: 'اندازه فونت',
          value: fontScale.toFixed(1),
          icon: '🔤',
          onPress: () =>
            Alert.alert('اندازه فونت', `فعلی: ${fontScale.toFixed(1)}x`, [
              { text: 'کوچک', onPress: () => setFontScale(0.9) },
              { text: 'عادی', onPress: () => setFontScale(1) },
              { text: 'بزرگ', onPress: () => setFontScale(1.1) },
            ]),
        },
        {
          label: 'انتخاب تم',
          icon: '🎨',
          onPress: () => Alert.alert('انتخاب تم', 'صفحه انتخاب تم در حال توسعه است'),
        },
      ],
    },
    {
      title: 'اطلاعات و زبان',
      items: [
        {
          label: 'زبان برنامه',
          value: language === 'fa' ? 'فارسی' : 'English',
          icon: '🌐',
          onPress: () =>
            Alert.alert('زبان', 'انتخاب زبان برنامه', [
              { text: 'فارسی', onPress: () => setLanguage('fa') },
              { text: 'English', onPress: () => setLanguage('en') },
            ]),
        },
        {
          label: 'تنظیمات تقویم',
          icon: '📅',
          onPress: () =>
            Alert.alert('تقویم', 'نوع تقویم', [
              { text: 'شمسی', onPress: () => Alert.alert('انتخاب شد: شمسی') },
              { text: 'میلادی', onPress: () => Alert.alert('انتخاب شد: میلادی') },
            ]),
        },
      ],
    },
    {
      title: 'پول و ارز',
      items: [
        {
          label: 'واحد پول',
          value: currency,
          icon: '💱',
          onPress: () =>
            Alert.alert('واحد پول', 'واحد پولی پیش‌فرض', [
              { text: 'ریال', onPress: () => setCurrency('IRR') },
              { text: 'تومان', onPress: () => setCurrency('TMN') },
              { text: 'دلار', onPress: () => setCurrency('USD') },
            ]),
        },
      ],
    },
    {
      title: 'اعلان‌ها',
      items: [
        {
          label: 'اعلان‌های عمومی',
          value: notifications ? 'فعال' : 'غیرفعال',
          icon: '🔔',
          toggle: true,
          toggleValue: notifications,
          onToggle: () => setNotifications(!notifications),
        },
        {
          label: 'پیام بانکی',
          value: '',
          icon: '💬',
          toggle: true,
          onToggle: () => Alert.alert('پیام بانکی', 'فعال/غیرفعال شد'),
        },
        {
          label: 'هشدار چک',
          value: '',
          icon: '🧾',
          toggle: true,
          onToggle: () => Alert.alert('هشدار چک', 'فعال/غیرفعال شد'),
        },
        {
          label: 'هشدار بودجه',
          value: '',
          icon: '🎯',
          toggle: true,
          onToggle: () => Alert.alert('هشدار بودجه', 'فعال/غیرفعال شد'),
        },
      ],
    },
    {
      title: 'پشتیبان‌گیری و دیتا',
      items: [
        {
          label: 'پشتیبان‌گیری محلی',
          icon: '💾',
          onPress: () => Alert.alert('پشتیبان‌گیری', 'دیتا محلی دستگاه پشتیبان‌گیری شد'),
        },
        {
          label: 'پشتیبان‌گیری ابری',
          icon: '☁️',
          onPress: () => Alert.alert('پشتیبان‌گیری ابری', 'دیتا بر روی فضای ابری ذخیره شد'),
        },
        {
          label: 'حذف همه اطلاعات',
          icon: '🗑️',
          destructive: true,
          onPress: () =>
            Alert.alert('توجه', 'آیا مطمئن هستید؟ این عمل غیرقابل بازگشت است', [
              { text: 'لغو', style: 'cancel' },
              { text: 'حذف', style: 'destructive', onPress: () => Alert.alert('حذف شد') },
            ]),
        },
      ],
    },
    {
      title: 'اطلاعات برنامه',
      items: [
        {
          label: 'نسخه برنامه',
          value: '4.6.9',
          icon: '📦',
        },
        {
          label: 'درباره ما',
          icon: 'ℹ️',
          onPress: () =>
            Alert.alert(
              'درباره حسابدار من',
              'برنامه مدیریت دارایی و هزینه خانواده\n\nنسخه: 4.6.9\n© 2024 Accounting App'
            ),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          opacity: item.destructive ? 0.8 : 1,
        },
      ]}
      onPress={item.onPress}
      disabled={!item.onPress && !item.toggle}
    >
      <View style={styles.settingLeft}>
        <Text style={{ fontSize: 16 }}>{item.icon}</Text>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingLabel, { color: item.destructive ? '#D64545' : colors.textDark }]}>
            {item.label}
          </Text>
          {item.value && (
            <Text style={[styles.settingValue, { color: colors.textLight }]}>
              {item.value}
            </Text>
          )}
        </View>
      </View>
      {item.toggle && (
        <Switch
          value={item.toggleValue}
          onValueChange={item.onToggle}
          trackColor={{ false: colors.border, true: '#2E86C1' }}
          thumbColor={item.toggleValue ? '#2E86C1' : '#f4f3f4'}
        />
      )}
      {item.onPress && !item.toggle && <Text style={{ color: colors.textLight }}>›</Text>}
    </TouchableOpacity>
  );

  const renderSettingGroup = (group: any) => (
    <View key={group.title} style={styles.group}>
      <Text style={[styles.groupTitle, { color: colors.textDark }]}>{group.title}</Text>
      <View style={[styles.groupContainer, { backgroundColor: colors.card }]}>
        {group.items.map((item: any, idx: number) => (
          <View key={idx}>
            {renderSettingItem(item)}
            {idx < group.items.length - 1 && (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: colors.primary }}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textDark }]}>تنظیمات</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Settings List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {settingsGroups.map(renderSettingGroup)}
      </ScrollView>

      {/* Profile Modal */}
      <Modal visible={showProfileModal} transparent animationType="fade">
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.textDark }]}>ویرایش پروفایل</Text>
              <TouchableOpacity onPress={() => setShowProfileModal(false)}>
                <Text style={{ fontSize: 20, color: colors.textLight }}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={[styles.fieldLabel, { color: colors.textLight }]}>نام کاربری</Text>
              <TextInput
                style={[styles.fieldInput, { color: colors.textDark, borderColor: colors.border }]}
                value={username}
                onChangeText={setUsername}
                placeholder="نام کاربری"
                placeholderTextColor={colors.textLight}
              />

              <Text style={[styles.fieldLabel, { color: colors.textLight }]}>نام خانوادگی</Text>
              <TextInput
                style={[styles.fieldInput, { color: colors.textDark, borderColor: colors.border }]}
                placeholder="نام خانوادگی"
                placeholderTextColor={colors.textLight}
              />

              <Text style={[styles.fieldLabel, { color: colors.textLight }]}>شماره تماس</Text>
              <TextInput
                style={[styles.fieldInput, { color: colors.textDark, borderColor: colors.border }]}
                placeholder="09xxxxxxxxx"
                placeholderTextColor={colors.textLight}
              />

              <Text style={[styles.fieldLabel, { color: colors.textLight }]}>ایمیل</Text>
              <TextInput
                style={[styles.fieldInput, { color: colors.textDark, borderColor: colors.border }]}
                placeholder="example@mail.com"
                placeholderTextColor={colors.textLight}
              />

              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: '#2E86C1' }]}
                onPress={() => {
                  Alert.alert('موفق', 'اطلاعات ذخیره شد');
                  setShowProfileModal(false);
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>ذخیره تغییرات</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: '#D64545', marginTop: 8 }]}
                onPress={() =>
                  Alert.alert('حذف حساب', 'آیا مطمئن هستید؟', [
                    { text: 'لغو', style: 'cancel' },
                    { text: 'حذف', style: 'destructive' },
                  ])
                }
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>حذف حساب</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  content: {
    padding: 12,
  },
  group: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  groupContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4E9EE',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingInfo: {
    gap: 2,
  },
  settingLabel: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 11,
  },
  divider: {
    height: 1,
    marginHorizontal: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  modalBody: {
    padding: 16,
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  fieldInput: {
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    marginBottom: 12,
  },
  saveBtn: {
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    fontWeight: '600',
  },
});

export default SettingsScreen;
