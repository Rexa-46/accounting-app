import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { formatPersianNumber } from '@/utils/formatters';
import {
  mockExpenseTransactions,
  mockIncomeTransactions,
  mockBankAccounts,
  mockPrivateFunds,
  mockBudgets,
  mockChecks,
} from '@/data/mockData';

type ReportType = 'income_expense' | 'balance' | 'invoice' | 'family' | 'project' | 'trial_balance';

const ReportScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Calculate totals
  const totalExpense = mockExpenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = mockIncomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBankBalance = mockBankAccounts.reduce((sum, b) => sum + b.balance, 0);
  const totalFundBalance = mockPrivateFunds.reduce((sum, f) => sum + f.balance, 0);
  const totalBudgetLimit = mockBudgets.reduce((sum, b) => sum + b.limitAmount, 0);
  const totalBudgetSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);

  const reports = [
    {
      id: 'income_expense',
      title: 'گزارش هزینه و درآمد',
      subtitle: 'روند ماهانه و مقایسه سرفصل‌ها',
      emoji: '📈',
      data: {
        totalIncome,
        totalExpense,
        net: totalIncome - totalExpense,
        byCategory: {
          'خوراک': 3200000,
          'حمل‌ونقل': 1450000,
          'قبوض': 960000,
          'تفریح': 520000,
        },
      },
    },
    {
      id: 'balance',
      title: 'گزارش مانده حساب',
      subtitle: 'موجودی لحظه‌ای همه حساب‌ها',
      emoji: '💰',
      data: {
        totalBankBalance,
        totalFundBalance,
        totalAllBalance: totalBankBalance + totalFundBalance,
        banks: mockBankAccounts,
        funds: mockPrivateFunds,
      },
    },
    {
      id: 'invoice',
      title: 'گزارش صورتحساب',
      subtitle: 'ریز تراکنش‌های هر بازه',
      emoji: '🧾',
      data: {
        transactions: [...mockExpenseTransactions, ...mockIncomeTransactions].slice(0, 10),
        totalCount: 20,
      },
    },
    {
      id: 'family',
      title: 'گزارش اعضای خانواده',
      subtitle: 'سهم هزینه هر عضو',
      emoji: '👨‍👩‍👧‍👦',
      data: {
        members: [
          { name: 'سارا', share: 45 },
          { name: 'رضا', share: 30 },
          { name: 'مامان', share: 15 },
          { name: 'بابا', share: 10 },
        ],
      },
    },
    {
      id: 'project',
      title: 'گزارش پروژه',
      subtitle: 'هزینه و بودجه هر پروژه',
      emoji: '📁',
      data: {
        projects: [
          { name: 'بازسازی خانه', budget: 50000000, spent: 32000000, progress: 64 },
          { name: 'سفر تابستان', budget: 15000000, spent: 8500000, progress: 57 },
        ],
      },
    },
    {
      id: 'trial_balance',
      title: 'ترازنامه',
      subtitle: 'دارایی‌ها در برابر بدهی‌ها',
      emoji: '⚖️',
      data: {
        assets: totalBankBalance + totalFundBalance,
        liabilities: mockChecks.reduce((sum, c) => sum + c.amount, 0),
        equity: (totalIncome - totalExpense) * 12, // yearly estimate
      },
    },
  ];

  const handleExportExcel = (reportId: ReportType) => {
    Alert.alert(
      'خروجی گرفتن',
      `گزارش "${reportId}" به فرمت Excel خروجی می‌شود`,
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'دانلود',
          onPress: () => {
            Alert.alert('موفق', 'فایل Excel دانلود شد');
          },
        },
      ]
    );
  };

  const renderReportCard = (report: any) => (
    <TouchableOpacity
      key={report.id}
      style={[styles.reportCard, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
      onPress={() => {
        setSelectedReport(report.id);
        setShowDetailModal(true);
      }}
    >
      <View style={styles.reportLeft}>
        <View style={[styles.reportIcon, { backgroundColor: colors.primary + '15' }]}>
          <Text style={{ fontSize: 20 }}>{report.emoji}</Text>
        </View>
        <View style={styles.reportInfo}>
          <Text style={[styles.reportTitle, { color: colors.textDark }]}>{report.title}</Text>
          <Text style={[styles.reportSub, { color: colors.textLight }]}>{report.subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.xlsBtn, { backgroundColor: '#1E8E5A' }]}
        onPress={() => handleExportExcel(report.id)}
      >
        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>📊 اکسل</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderReportDetail = () => {
    const report = reports.find((r) => r.id === selectedReport);
    if (!report) return null;

    switch (selectedReport) {
      case 'income_expense':
        return (
          <View>
            <View style={[styles.detailRow, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.detailLabel, { color: colors.textLight }]}>جمع درآمد</Text>
              <Text style={[styles.detailValue, { color: '#1E8E5A' }]}>
                {formatPersianNumber((report.data.totalIncome / 1000000).toFixed(2))}M
              </Text>
            </View>
            <View style={[styles.detailRow, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.detailLabel, { color: colors.textLight }]}>جمع هزینه</Text>
              <Text style={[styles.detailValue, { color: '#D64545' }]}>
                {formatPersianNumber((report.data.totalExpense / 1000000).toFixed(2))}M
              </Text>
            </View>
            <View style={[styles.detailRow, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.detailLabel, { color: colors.textLight }]}>خالص</Text>
              <Text style={[styles.detailValue, { color: report.data.net > 0 ? '#1E8E5A' : '#D64545' }]}>
                {formatPersianNumber((report.data.net / 1000000).toFixed(2))}M
              </Text>
            </View>
            <Text style={[styles.categoryTitle, { color: colors.textDark, marginTop: 12 }]}>
              تفکیک به سرفصل
            </Text>
            {Object.entries(report.data.byCategory).map(([category, amount]: any) => (
              <View key={category} style={[styles.categoryRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.categoryName, { color: colors.textDark }]}>{category}</Text>
                <Text style={[styles.categoryAmount, { color: colors.textDark }]}>
                  {formatPersianNumber((amount / 1000000).toFixed(2))}M
                </Text>
              </View>
            ))}
          </View>
        );

      case 'balance':
        return (
          <View>
            <Text style={[styles.categoryTitle, { color: colors.textDark }]}>بانک‌ها</Text>
            {report.data.banks.map((bank: any) => (
              <View key={bank.id} style={[styles.categoryRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.categoryName, { color: colors.textDark }]}>{bank.name}</Text>
                <Text style={[styles.categoryAmount, { color: colors.textDark }]}>
                  {formatPersianNumber((bank.balance / 1000000).toFixed(2))}M
                </Text>
              </View>
            ))}
            <Text style={[styles.categoryTitle, { color: colors.textDark, marginTop: 12 }]}>
              صندوق‌ها
            </Text>
            {report.data.funds.map((fund: any) => (
              <View key={fund.id} style={[styles.categoryRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.categoryName, { color: colors.textDark }]}>{fund.name}</Text>
                <Text style={[styles.categoryAmount, { color: colors.textDark }]}>
                  {formatPersianNumber((fund.balance / 1000000).toFixed(2))}M
                </Text>
              </View>
            ))}
            <View style={[styles.detailRow, { backgroundColor: colors.primary + '10', marginTop: 12 }]}>
              <Text style={[styles.detailLabel, { color: colors.textDark, fontWeight: '700' }]}>
                جمع کل موجودی
              </Text>
              <Text style={[styles.detailValue, { color: colors.primary }]}>
                {formatPersianNumber((report.data.totalAllBalance / 1000000).toFixed(2))}M
              </Text>
            </View>
          </View>
        );

      case 'trial_balance':
        return (
          <View>
            <View style={[styles.detailRow, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.detailLabel, { color: colors.textDark }]}>دارایی‌ها</Text>
              <Text style={[styles.detailValue, { color: '#1E8E5A' }]}>
                {formatPersianNumber((report.data.assets / 1000000).toFixed(2))}M
              </Text>
            </View>
            <View style={[styles.detailRow, { backgroundColor: '#FFEBEE' }]}>
              <Text style={[styles.detailLabel, { color: colors.textDark }]}>بدهی‌ها</Text>
              <Text style={[styles.detailValue, { color: '#D64545' }]}>
                {formatPersianNumber((report.data.liabilities / 1000000).toFixed(2))}M
              </Text>
            </View>
            <View style={[styles.detailRow, { backgroundColor: '#F3E5F5' }]}>
              <Text style={[styles.detailLabel, { color: colors.textDark }]}>سرمایه</Text>
              <Text style={[styles.detailValue, { color: '#7A5CC0' }]}>
                {formatPersianNumber((report.data.equity / 1000000).toFixed(2))}M
              </Text>
            </View>
          </View>
        );

      default:
        return (
          <Text style={[styles.detailLabel, { color: colors.textLight, textAlign: 'center', marginTop: 20 }]}>
            در حال دیکھ گزارش...
          </Text>
        );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: colors.primary }}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textDark }]}>گزارش‌های مدیریتی</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Reports List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {reports.map(renderReportCard)}
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={showDetailModal} transparent animationType="fade">
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.textDark }]}>
                {reports.find((r) => r.id === selectedReport)?.title}
              </Text>
              <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                <Text style={{ fontSize: 20, color: colors.textLight }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>{renderReportDetail()}</ScrollView>
            <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#1E8E5A' }]}
                onPress={() => handleExportExcel(selectedReport!)}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>📊 دانلود اکسل</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={() => setShowDetailModal(false)}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>بستن</Text>
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
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 14,
    marginVertical: 6,
    borderRadius: 16,
    borderBottomWidth: 1,
  },
  reportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportInfo: {
    gap: 2,
  },
  reportTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  reportSub: {
    fontSize: 11,
  },
  xlsBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
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
    padding: 14,
    maxHeight: 300,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12.5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
  },
  categoryName: {
    fontSize: 12.5,
  },
  categoryAmount: {
    fontSize: 12.5,
    fontWeight: '600',
  },
});

export default ReportScreen;
