import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { formatPersianNumber } from '@/utils/formatters';
import {
  mockExpenseTransactions,
  mockIncomeTransactions,
  mockTransferTransactions,
} from '@/data/mockData';

const { width } = Dimensions.get('window');

type FilterType = 'all' | 'expense' | 'income' | 'transfer';

const TransactionScreen: React.FC = () => {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Combine all transactions
  const allTransactions = useMemo(() => {
    const combined = [
      ...mockExpenseTransactions.map((t) => ({ ...t, type: 'expense' as const })),
      ...mockIncomeTransactions.map((t) => ({ ...t, type: 'income' as const })),
      ...mockTransferTransactions.map((t) => ({ ...t, type: 'transfer' as const })),
    ];
    return combined.sort((a, b) =>
      sortOrder === 'desc' ? b.date.getTime() - a.date.getTime() : a.date.getTime() - b.date.getTime()
    );
  }, [sortOrder]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let result = allTransactions;

    // Filter by type
    if (filter !== 'all') {
      result = result.filter((t) => t.type === filter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      result = result.filter(
        (t) =>
          t.title.includes(searchQuery) ||
          t.description?.includes(searchQuery) ||
          t.category.includes(searchQuery)
      );
    }

    return result;
  }, [allTransactions, filter, searchQuery]);

  const renderTransactionRow = (tx: any) => {
    const typeColors = {
      expense: '#D64545',
      income: '#1E8E5A',
      transfer: '#C9942B',
    };

    const typeEmoji = {
      expense: '💸',
      income: '💰',
      transfer: '🔄',
    };

    return (
      <TouchableOpacity
        key={tx.id}
        style={[
          styles.txRow,
          {
            backgroundColor: colors.card,
            borderRightColor: typeColors[tx.type],
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.txMain}>
          <View style={[styles.txIcon, { backgroundColor: typeColors[tx.type] + '20' }]}>
            <Text style={{ fontSize: 16 }}>{typeEmoji[tx.type]}</Text>
          </View>
          <View style={styles.txInfo}>
            <Text style={[styles.txTitle, { color: colors.textDark }]}>{tx.title}</Text>
            <Text style={[styles.txSub, { color: colors.textLight }]}>{tx.fromAccount}</Text>
          </View>
        </View>
        <View style={styles.txRight}>
          <Text style={[styles.txAmount, { color: typeColors[tx.type] }]}>
            {tx.type === 'expense' ? '-' : '+'}
            {formatPersianNumber((tx.amount / 1000000).toFixed(2))}
          </Text>
          <Text style={[styles.txTime, { color: colors.textLight }]}>
            {tx.date.toLocaleDateString('fa-IR')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: colors.primary }}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textDark }]}>تراکنش‌ها</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Text style={{ fontSize: 18, color: colors.primary }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            <Text style={{ fontSize: 18, color: colors.primary }}>↕️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, color: colors.primary }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <TextInput
            style={[styles.searchInput, { color: colors.textDark, borderColor: colors.border }]}
            placeholder="جستجو..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {(['all', 'expense', 'income', 'transfer'] as FilterType[]).map((tab) => {
          const tabLabels = {
            all: 'همه',
            expense: 'پرداخت‌ها',
            income: 'دریافت‌ها',
            transfer: 'انتقال‌ها',
          };

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilter(tab)}
              style={[
                styles.tab,
                {
                  backgroundColor: filter === tab ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  { color: filter === tab ? '#fff' : colors.textLight },
                ]}
              >
                {tabLabels[tab]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Transactions List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(renderTransactionRow)
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textLight }]}>
              تراکنشی یافت نشد
            </Text>
          </View>
        )}
      </ScrollView>
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
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  searchBar: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
  },
  tabsContainer: {
    maxHeight: 50,
  },
  tabsContent: {
    paddingHorizontal: 10,
    gap: 6,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    whiteSpace: 'nowrap',
  },
  tabLabel: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    marginVertical: 6,
    borderRightWidth: 3,
    borderBottomWidth: 1,
  },
  txMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  txIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txInfo: {
    gap: 2,
  },
  txTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  txSub: {
    fontSize: 11,
  },
  txRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: '800',
  },
  txTime: {
    fontSize: 10.5,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 13,
  },
});

export default TransactionScreen;
