import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ReportScreen = () => {
  const route = useRoute();
  const transactions = route.params?.transactions || [];

  // Calculate totals using reduce
  const totalIncome = transactions
    .filter((t) => t.category === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.category === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Report</Text>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Income</Text>
          <Text style={styles.incomeText}>${totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Expenses</Text>
          <Text style={styles.expenseText}>${totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={styles.balanceText}>${balance.toFixed(2)}</Text>
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionCategory}>
                {item.category} | {item.date}
              </Text>
            </View>
            <Text style={item.category === 'Income' ? styles.incomeText : styles.expenseText}>
              ${item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryBox: { padding: 10, borderRadius: 8, backgroundColor: '#fff', width: '32%', alignItems: 'center' },
  summaryLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  incomeText: { fontSize: 18, fontWeight: 'bold', color: '#28a745' },
  expenseText: { fontSize: 18, fontWeight: 'bold', color: '#dc3545' },
  balanceText: { fontSize: 18, fontWeight: 'bold', color: '#007bff' },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginBottom: 10 },
  transactionTitle: { fontSize: 16, fontWeight: 'bold' },
  transactionCategory: { fontSize: 14, color: '#6c757d' },
});
