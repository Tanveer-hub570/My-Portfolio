import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Expense');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  // Function to add a new transaction
  const addTransaction = () => {
    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date: date.toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);

    // Reset fields
    setTitle('');
    setAmount('');
    setCategory('Expense');
    setDate(new Date());
    setModalVisible(false);
  };

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
      <Text style={styles.title}>Expense Tracker</Text>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.incomeText}>${totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={styles.expenseText}>${totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={styles.balanceText}>${balance.toFixed(2)}</Text>
        </View>
      </View>

      {/* Add Transaction Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Transaction</Text>
      </TouchableOpacity>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionCategory}>{item.category} | {item.date}</Text>
            </View>
            <Text style={item.category === 'Income' ? styles.incomeText : styles.expenseText}>
              ${item.amount}
            </Text>
          </View>
        )}
      />

      {/* View Reports Button */}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => navigation.navigate('Report', { transactions })}
      >
        <Text style={styles.reportButtonText}>View Reports</Text>
      </TouchableOpacity>

      {/* Add Transaction Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Transaction</Text>

            <TextInput
              placeholder="Title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Amount"
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            {/* Category Picker */}
            <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
              <Picker.Item label="Expense" value="Expense" />
              <Picker.Item label="Income" value="Income" />
            </Picker>

            {/* Date Picker */}
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>Select Date: {date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
              <Button title="Add" onPress={addTransaction} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryBox: { padding: 10, borderRadius: 8, backgroundColor: '#fff', width: '32%', alignItems: 'center' },
  summaryLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  incomeText: { fontSize: 18, fontWeight: 'bold', color: '#28a745' },
  expenseText: { fontSize: 18, fontWeight: 'bold', color: '#dc3545' },
  balanceText: { fontSize: 18, fontWeight: 'bold', color: '#007bff' },
  addButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  addButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginBottom: 10 },
  transactionTitle: { fontSize: 16, fontWeight: 'bold' },
  transactionCategory: { fontSize: 14, color: '#6c757d' },
  reportButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  reportButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  picker: { height: 50, width: '100%' },
  dateButton: { padding: 10, backgroundColor: '#007bff', borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  dateText: { color: '#fff', fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
});
