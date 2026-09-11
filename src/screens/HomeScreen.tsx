import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { formatPersianNumber } from '@/utils/formatters';
import {
  mockBankAccounts,
  mockPrivateFunds,
  mockExpenseTransactions,
  mockIncomeTransactions,
  mockBudgets,
  mockChecks,
  mockShortcuts,
} from '@/data/mockData';

const { width } = Dimensions.get('window');

// SVG Smiley Components
const SmileyFace = ({ type }: { type: 'happy' | 'sad' | 'neutral' }) => {
  const renderPath = () => {
    switch (type) {
      case 'sad':
        return (
          <View style={[styles.smileyBox, { backgroundColor: '#F5EFDD' }]}>
            <Text style={styles.smileyText}>😢</Text>
          </View>
        );
      case 'happy':
        return (
          <View style={[styles.smileyBox, { backgroundColor: '#F5EFDD' }]}>
            <Text style={styles.smileyText}>😊</Text>
          </View>
        );
      case 'neutral':
      default:
        return (
          <View style={[styles.smileyBox, { backgroundColor: '#F5EFDD' }]}>
            <Text style={styles.smileyText}>😐</Text>
          </View>
        );
    }
  };

  return renderPath();
};

// Sunburst Chart (Simple Ring Chart)
const SunburstChart = ({ data, size = 80 }: { data: { amount: number }[]; size?: number }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#E8F4F8',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 10, color: '#666' }}>📊</Text>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [currentYear, setCurrentYear] = useState(1405);
  const [expenseDay, setExpenseDay] = useState(0);
  const [incomeDay, setIncomeDay] = useState(0);
  const [checkIndex, setCheckIndex] = useState(0);
  const [emotion, setEmotion] = useState<'happy' | 'sad' | 'neutral'>('sad');
  const [expandedSection, setExpandedSection] = useState<string | null>('shortcuts');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'expense' | 'income' | 'check' | 'note'>('expense');

  // Calculate totals
  const totalExpense = mockExpenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = mockIncomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBankBalance = mockBankAccounts.reduce((sum, b) => sum + b.balance, 0);
  const totalFundBalance = mockPrivateFunds.reduce((sum, f) => sum + f.balance, 0);

  // Update emotion based on totals
  useEffect(() => {
    if (totalIncome > totalExpense) setEmotion('happy');
    else if (totalIncome < totalExpense) setEmotion('sad');
    else setEmotion('neutral');
  }, [totalIncome, totalExpense]);

  // Daily totals
  const todayExpenseTotal = mockExpenseTransactions
    .filter((t) => t.date.toDateString() === new Date().toDateString())
    .reduce((sum, t) => sum + t.amount, 0);

  const todayIncomeTotal = mockIncomeTransactions
    .filter((t) => t.date.toDateString() === new Date().toDateString())
    .reduce((sum, t) => sum + t.amount, 0);

  const renderSection = (title: string, key: string, content: React.ReactNode) => (
    <View style={[styles.sectionCard, { backgroundColor: colors.card || '#FFF' }]}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpandedSection(expandedSection === key ? null : key)}
      >
        <Text style={[styles.sectionTitle, { color: colors.textDark }]}>{title}</Text>
        <Text style={[styles.chevron, { color: colors.primary }]}>
          {expandedSection === key ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>
      {expandedSection === key && <View style={styles.sectionContent}>{content}</View>}
    </View>
  );

  const renderTransactionRow = (tx: any) => (
    <View key={tx.id} style={[styles.txRow, { borderBottomColor: colors.border }]}>
      <View style={styles.txLeft}>
        <Text style={styles.txEmoji}>📌</Text>
        <View>
          <Text style={[styles.txTitle, { color: colors.textDark }]}>{tx.title}</Text>
          <Text style={[styles.txSub, { color: colors.textLight }]}>{tx.category}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.txAmount,
          {
            color:
              tx.type === 'expense'
                ? '#D64545'
                : tx.type === 'income'
                  ? '#1E8E5A'
                  : '#C9942B',
          },
        ]}
      >
        {tx.type === 'expense' ? '-' : '+'}
        {formatPersianNumber(tx.amount.toString())}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Username */}
        <View style={styles.usernameStrip}>
          <Text style={[styles.usernameText, { color: colors.textLight }]}>
            خوش اومدی، <Text style={{ fontWeight: 'bold', color: colors.textDark }}>سارا احمدی</Text>
          </Text>
        </View>

        {/* Year Selector & Charts */}
        <View style={styles.yearChartContainer}>
          <TouchableOpacity
            style={[styles.miniChart, { backgroundColor: colors.card }]}
            onPress={() => setShowAddModal(true)}
          >
            <SunburstChart data={mockIncomeTransactions} />
            <Text style={[styles.miniChartLabel, { color: colors.textLight }]}>درآمد</Text>
            <Text style={[styles.miniAmount, { color: '#1E8E5A' }]}>
              {formatPersianNumber((totalIncome / 1000000).toFixed(1))}M
            </Text>
          </TouchableOpacity>

          <View style={styles.yearNav}>
            <TouchableOpacity
              style={[styles.yearArrow, { backgroundColor: colors.card }]}
              onPress={() => setCurrentYear(currentYear - 1)}
            >
              <Text style={{ color: '#2E86C1' }}>›</Text>
            </TouchableOpacity>
            <Text style={[styles.yearDisplay, { color: colors.textDark }]}>
              {formatPersianNumber(currentYear.toString())}
            </Text>
            <TouchableOpacity
              style={[styles.yearArrow, { backgroundColor: colors.card }]}
              onPress={() => setCurrentYear(currentYear + 1)}
            >
              <Text style={{ color: '#2E86C1' }}>‹</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.miniChart, { backgroundColor: colors.card }]}
            onPress={() => setShowAddModal(true)}
          >
            <SunburstChart data={mockExpenseTransactions} />
            <Text style={[styles.miniChartLabel, { color: colors.textLight }]}>هزینه</Text>
            <Text style={[styles.miniAmount, { color: '#D64545' }]}>
              {formatPersianNumber((totalExpense / 1000000).toFixed(1))}M
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emotion Box */}
        <View style={[styles.emotionBox, { backgroundColor: colors.card, borderColor: '#D64545' }]}>
          <SmileyFace type={emotion} />
          <Text style={[styles.emotionCaption, { color: colors.textLight }]}>
            {emotion === 'happy'
              ? 'درآمد بیشتر از هزینه‌ها است! عالیه!'
              : emotion === 'sad'
                ? 'هزینه‌ها بیشتر از درآمدها، مراقب باش!'
                : 'درآمد و هزینه برابر است'}
          </Text>
        </View>

        {/* Sections */}
        {/* SHORTCUTS */}
        {renderSection(
          '🏷️ میانبر تراکنش‌ها',
          'shortcuts',
          <View style={styles.shortcutRow}>
            {mockShortcuts.map((s) => (
              <TouchableOpacity key={s.id} style={styles.shortcutItem}>
                <View style={[styles.shortcutIcon, { backgroundColor: '#E8F4F8' }]}>
                  <Text style={{ fontSize: 18 }}>{s.emoji}</Text>
                </View>
                <Text style={[styles.shortcutLabel, { color: colors.textLight }]}>{s.title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.shortcutItem}>
              <View style={[styles.shortcutIcon, { backgroundColor: '#E8F4F8', borderWidth: 1, borderColor: colors.textLight }]}>
                <Text style={{ fontSize: 18 }}>➕</Text>
              </View>
              <Text style={[styles.shortcutLabel, { color: colors.textLight }]}>افزودن</Text>
            </TouchableOpacity>
          </View>,
        )}

        {/* EXPENSES */}
        {renderSection(
          '🔻 هزینه‌ها',
          'expenses',
          <View>
            <View style={styles.dateNav}>
              <TouchableOpacity onPress={() => setExpenseDay(Math.max(0, expenseDay - 1))}>
                <Text style={{ color: '#2E86C1', fontSize: 16 }}>›</Text>
              </TouchableOpacity>
              <Text style={[styles.dateLabel, { color: colors.textDark }]}>امروز</Text>
              <TouchableOpacity onPress={() => setExpenseDay(expenseDay + 1)}>
                <Text style={{ color: '#2E86C1', fontSize: 16 }}>‹</Text>
              </TouchableOpacity>
            </View>
            {mockExpenseTransactions.map(renderTransactionRow)}
            <View style={[styles.dayTotal, { borderTopColor: colors.border }]}>
              <Text style={[styles.dayTotalLabel, { color: colors.textLight }]}>جمع امروز</Text>
              <Text style={[styles.dayTotalAmount, { color: colors.textDark }]}>
                {formatPersianNumber(todayExpenseTotal.toString())}
              </Text>
            </View>
          </View>,
        )}

        {/* INCOME */}
        {renderSection(
          '🔺 درآمدها',
          'income',
          <View>
            <View style={styles.dateNav}>
              <TouchableOpacity onPress={() => setIncomeDay(Math.max(0, incomeDay - 1))}>
                <Text style={{ color: '#2E86C1', fontSize: 16 }}>›</Text>
              </TouchableOpacity>
              <Text style={[styles.dateLabel, { color: colors.textDark }]}>امروز</Text>
              <TouchableOpacity onPress={() => setIncomeDay(incomeDay + 1)}>
                <Text style={{ color: '#2E86C1', fontSize: 16 }}>‹</Text>
              </TouchableOpacity>
            </View>
            {mockIncomeTransactions.map(renderTransactionRow)}
            <View style={[styles.dayTotal, { borderTopColor: colors.border }]}>
              <Text style={[styles.dayTotalLabel, { color: colors.textLight }]}>جمع امروز</Text>
              <Text style={[styles.dayTotalAmount, { color: colors.textDark }]}>
                {formatPersianNumber(todayIncomeTotal.toString())}
              </Text>
            </View>
          </View>,
        )}

        {/* BANKS */}
        {renderSection(
          '🏦 بانک‌ها',
          'banks',
          <View>
            {mockBankAccounts.map((bank) => (
              <TouchableOpacity key={bank.id} style={[styles.bankRow, { borderBottomColor: colors.border }]}>
                <View style={styles.bankLeft}>
                  <View style={[styles.bankIcon, { backgroundColor: bank.color + '20' }]}>
                    <Text style={{ fontSize: 18 }}>🏦</Text>
                  </View>
                  <View>
                    <Text style={[styles.bankName, { color: colors.textDark }]}>{bank.name}</Text>
                  </View>
                </View>
                <Text style={[styles.bankBalance, { color: colors.textDark }]}>
                  {formatPersianNumber((bank.balance / 1000000).toFixed(1))}M
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.addButton, { borderColor: colors.textLight }]}>
              <Text style={[styles.addButtonText, { color: colors.textLight }]}>➕ افزودن بانک</Text>
            </TouchableOpacity>
          </View>,
        )}

        {/* FUNDS */}
        {renderSection(
          '👛 صندوق شخصی',
          'funds',
          <View>
            {mockPrivateFunds.map((fund) => (
              <TouchableOpacity key={fund.id} style={[styles.bankRow, { borderBottomColor: colors.border }]}>
                <View style={styles.bankLeft}>
                  <View style={[styles.bankIcon, { backgroundColor: fund.color + '20' }]}>
                    <Text style={{ fontSize: 18 }}>💼</Text>
                  </View>
                  <View>
                    <Text style={[styles.bankName, { color: colors.textDark }]}>{fund.name}</Text>
                  </View>
                </View>
                <Text style={[styles.bankBalance, { color: colors.textDark }]}>
                  {formatPersianNumber((fund.balance / 1000000).toFixed(1))}M
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.addButton, { borderColor: colors.textLight }]}>
              <Text style={[styles.addButtonText, { color: colors.textLight }]}>➕ افزودن صندوق</Text>
            </TouchableOpacity>
          </View>,
        )}

        {/* BALANCE REPORT */}
        {renderSection(
          '📊 گزارش مانده حساب‌ها',
          'balance',
          <View style={styles.balanceGrid}>
            <TouchableOpacity style={[styles.balanceStat, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.balanceLabel, { color: colors.textLight }]}>جمع هزینه‌ها</Text>
              <Text style={[styles.balanceValue, { color: '#D64545' }]}>
                {formatPersianNumber((totalExpense / 1000000).toFixed(1))}M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.balanceStat, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.balanceLabel, { color: colors.textLight }]}>جمع درآمدها</Text>
              <Text style={[styles.balanceValue, { color: '#1E8E5A' }]}>
                {formatPersianNumber((totalIncome / 1000000).toFixed(1))}M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.balanceStat, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.balanceLabel, { color: colors.textLight }]}>جمع بانک‌ها</Text>
              <Text style={[styles.balanceValue, { color: '#2E86C1' }]}>
                {formatPersianNumber((totalBankBalance / 1000000).toFixed(1))}M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.balanceStat, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.balanceLabel, { color: colors.textLight }]}>جمع صندوق‌ها</Text>
              <Text style={[styles.balanceValue, { color: '#7A5CC0' }]}>
                {formatPersianNumber((totalFundBalance / 1000000).toFixed(1))}M
              </Text>
            </TouchableOpacity>
          </View>,
        )}

        {/* BUDGETS */}
        {renderSection(
          '🎯 بودجه‌بندی',
          'budget',
          <View>
            {mockBudgets.map((b) => {
              const percent = Math.min(100, (b.spent / b.limitAmount) * 100);
              return (
                <TouchableOpacity key={b.id} style={styles.budgetRow}>
                  <View style={styles.budgetInfo}>
                    <View style={styles.budgetHeader}>
                      <Text style={[styles.budgetTitle, { color: colors.textDark }]}>{b.name}</Text>
                      <Text style={[styles.budgetPercent, { color: colors.textLight }]}>
                        {Math.round(percent)}%
                      </Text>
                    </View>
                    <View style={[styles.budgetBar, { backgroundColor: colors.lightBg }]}>
                      <View
                        style={[
                          styles.budgetFill,
                          {
                            width: `${percent}%`,
                            backgroundColor: percent > 80 ? '#D64545' : '#2E86C1',
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.budgetSub, { color: colors.textLight }]}>
                      {formatPersianNumber(b.spent.toString())} / {formatPersianNumber(b.limitAmount.toString())}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={[styles.addButton, { borderColor: colors.textLight }]}>
              <Text style={[styles.addButtonText, { color: colors.textLight }]}>➕ افزودن بودجه</Text>
            </TouchableOpacity>
          </View>,
        )}

        {/* CHECKS */}
        {renderSection(
          '🧾 چک‌ها',
          'checks',
          <View>
            <View style={styles.dateNav}>
              <TouchableOpacity onPress={() => setCheckIndex(Math.max(0, checkIndex - 1))}>
                <Text style={{ color: '#2E86C1', fontSize: 16 }}>›</Text>
              </TouchableOpacity>
              <Text style={[styles.dateLabel, { color: colors.textDark }]}>نزدیک‌ترین سررسید</Text>
              <TouchableOpacity onPress={() => setCheckIndex(Math.min(mockChecks.length - 1, checkIndex + 1))}>
                <Text style={{ color: '#2E86C1', fontSize: 16 }}>‹</Text>
              </TouchableOpacity>
            </View>
            {mockChecks.length > 0 && (
              <TouchableOpacity style={[styles.checkCard, { backgroundColor: colors.lightBg }]}>
                <View style={styles.checkRow1}>
                  <Text style={[styles.checkAmount, { color: colors.textDark }]}>
                    {formatPersianNumber(mockChecks[checkIndex].amount.toString())}
                  </Text>
                  <Text style={[styles.checkNum, { color: colors.textDark }]}>
                    شماره {mockChecks[checkIndex].checkNumber}
                  </Text>
                </View>
                <View style={styles.checkRow2}>
                  <Text style={[styles.checkDesc, { color: colors.textLight }]}>
                    {mockChecks[checkIndex].description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>,
        )}

        {/* NOTES */}
        {renderSection(
          '📝 یادداشت‌ها',
          'notes',
          <View>
            <TouchableOpacity style={[styles.noteItem, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.noteText, { color: colors.textDark }]}>یادآوری: پرداخت قسط وام تا پایان هفته</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.noteItem, { backgroundColor: colors.lightBg }]}>
              <Text style={[styles.noteText, { color: colors.textDark }]}>خرید هدیه تولد برای مامان</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, { borderColor: colors.textLight, marginTop: 10 }]}
              onPress={() => {
                setModalType('note');
                setShowAddModal(true);
              }}
            >
              <Text style={[styles.addButtonText, { color: colors.textLight }]}>➕ یادداشت جدید</Text>
            </TouchableOpacity>
          </View>,
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  usernameStrip: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  usernameText: {
    fontSize: 14,
  },
  yearChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  miniChart: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    width: width / 4,
  },
  miniChartLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  miniAmount: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  yearNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  yearArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearDisplay: {
    fontSize: 18,
    fontWeight: '800',
    minWidth: 60,
    textAlign: 'center',
  },
  smileyBox: {
    width: 100,
    height: 80,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smileyText: {
    fontSize: 50,
  },
  emotionBox: {
    marginHorizontal: 14,
    marginVertical: 10,
    borderRadius: 16,
    padding: 12,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    alignItems: 'center',
    gap: 6,
  },
  emotionCaption: {
    fontSize: 12.5,
    textAlign: 'center',
  },
  sectionCard: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4E9EE',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  chevron: {
    fontSize: 12,
  },
  sectionContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#E4E9EE',
  },
  shortcutRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  shortcutItem: {
    width: '23%',
    alignItems: 'center',
    gap: 4,
  },
  shortcutIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortcutLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  dateNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  txEmoji: {
    fontSize: 18,
  },
  txTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  txSub: {
    fontSize: 11,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
  dayTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 1,
  },
  dayTotalLabel: {
    fontSize: 12.5,
  },
  dayTotalAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  bankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  bankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bankIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 13,
    fontWeight: '600',
  },
  bankBalance: {
    fontSize: 13,
    fontWeight: '700',
  },
  addButton: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12.5,
    fontWeight: '500',
  },
  balanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  balanceStat: {
    width: '48%',
    borderRadius: 12,
    padding: 10,
  },
  balanceLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  budgetRow: {
    marginBottom: 10,
  },
  budgetInfo: {
    gap: 4,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  budgetPercent: {
    fontSize: 11,
  },
  budgetBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  budgetFill: {
    height: '100%',
  },
  budgetSub: {
    fontSize: 11,
  },
  checkCard: {
    borderRadius: 12,
    padding: 10,
    marginTop: 6,
  },
  checkRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: '700',
    marginBottom: 6,
  },
  checkAmount: {
    fontSize: 13,
    fontWeight: '600',
  },
  checkNum: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkRow2: {
    marginTop: 4,
  },
  checkDesc: {
    fontSize: 12,
  },
  noteItem: {
    borderRadius: 10,
    padding: 9,
    marginBottom: 6,
  },
  noteText: {
    fontSize: 12.5,
  },
});

export default HomeScreen;
