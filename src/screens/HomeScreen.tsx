import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { getYearDateRange } from '@/utils/helpers';
import { formatPersianNumber, formatJalaliDate } from '@/utils/formatters';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [income, setIncome] = useState(95000);
  const [expense, setExpense] = useState(120000);
  const [emotion, setEmotion] = useState<'happy' | 'sad' | 'neutral'>('sad');

  useEffect(() => {
    // Calculate emotion based on income vs expense
    if (income > expense) setEmotion('happy');
    else if (income < expense) setEmotion('sad');
    else setEmotion('neutral');
  }, [income, expense]);

  const renderEmotionSVG = () => {
    switch (emotion) {
      case 'happy':
        return (
          <View style={styles.svgContainer}>
            <Text style={styles.emotionIcon}>😊</Text>
          </View>
        );
      case 'sad':
        return (
          <View style={styles.svgContainer}>
            <Text style={styles.emotionIcon}>😢</Text>
          </View>
        );
      case 'neutral':
      default:
        return (
          <View style={styles.svgContainer}>
            <Text style={styles.emotionIcon}>😐</Text>
          </View>
        );
    }
  };

  const emotionTexts = {
    happy: 'درآمدها بیشتر از هزینه‌ها است!',
    sad: 'هزینه‌ها بیشتر از درآمدها است!',
    neutral: 'درآمدها و هزینه‌ها برابر هستند!',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightBg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Year Selector */}
        <View style={[styles.yearSelector, { backgroundColor: colors.borderColor }]}>
          <TouchableOpacity onPress={() => setCurrentYear(currentYear - 1)}>
            <Text style={[styles.yearButton, { color: colors.primary }]}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.yearDisplay, { color: colors.textDark }]}>
            {formatPersianNumber(currentYear.toString())}
          </Text>
          <TouchableOpacity onPress={() => setCurrentYear(currentYear + 1)}>
            <Text style={[styles.yearButton, { color: colors.primary }]}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Charts Section */}
        <View style={styles.chartsContainer}>
          <View style={[styles.chartBox, { backgroundColor: colors.lightBg }]}>
            <Text style={[styles.chartTitle, { color: colors.textLight }]}>هزینه‌ها</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartText}>Sunburst</Text>
            </View>
            <Text style={[styles.chartAmount, { color: colors.danger }]}>
              {formatPersianNumber('52000')}
            </Text>
          </View>

          {/* Emotion Display */}
          <View style={[styles.emotionBox, { backgroundColor: colors.lightBg }]}>
            {renderEmotionSVG()}
            <Text style={[styles.emotionText, { color: colors.textLight }]}>
              {emotionTexts[emotion]}
            </Text>
          </View>

          <View style={[styles.chartBox, { backgroundColor: colors.lightBg }]}>
            <Text style={[styles.chartTitle, { color: colors.textLight }]}>درآمدها</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartText}>Pie Chart</Text>
            </View>
            <Text style={[styles.chartAmount, { color: colors.secondary }]}>
              {formatPersianNumber('35000')}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderLeftColor: colors.danger, backgroundColor: 'white' }]}>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>مجموع هزینه</Text>
            <Text style={[styles.statValue, { color: colors.danger }]}>
              {formatPersianNumber('120,000')}
            </Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: colors.secondary, backgroundColor: 'white' }]}>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>مجموع درآمد</Text>
            <Text style={[styles.statValue, { color: colors.secondary }]}>
              {formatPersianNumber('95,000')}
            </Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: colors.warning, backgroundColor: 'white' }]}>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>خالص</Text>
            <Text style={[styles.statValue, { color: colors.warning }]}>
              {formatPersianNumber('-25,000')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    margin: 10,
    paddingVertical: 15,
    borderRadius: 8,
  },
  yearButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  yearDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 80,
    textAlign: 'center',
  },
  chartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    gap: 10,
  },
  chartBox: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    gap: 10,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  chartAmount: {
    fontSize: 10,
    fontWeight: '600',
  },
  emotionBox: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    minHeight: 150,
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionIcon: {
    fontSize: 60,
  },
  emotionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  statsContainer: {
    padding: 15,
    gap: 10,
  },
  statCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;