import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Pressable } from 'react-native';
import FormulaInfoPopup from '../../components/FormulaInfoPopup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FinancialCalculatorScreen = () => {
    const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [compoundFrequency, setCompoundFrequency] = useState('annually');
    const [result, setResult] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [formulaPopupVisible, setFormulaPopupVisible] = useState(false);

    const calculateLoanPayment = () => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
        const n = parseFloat(timePeriod) * 12; // Number of payments

        const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setResult(`Monthly Payment: ₹${monthlyPayment.toFixed(2)}`);
        toggleModal();
    };

    const calculateSimpleInterest = () => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate);
        const t = parseFloat(timePeriod);

        const interest = (p * r * t) / 100;
        const futureValue = p + interest;
        setResult(`Simple Interest: ₹${interest.toFixed(2)} (Total Amount: ₹${futureValue.toFixed(2)})`);
        toggleModal();
    };

    const calculateCompoundInterest = () => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100; // Annual interest rate
        const n = getCompoundingFrequency(compoundFrequency);
        const t = parseFloat(timePeriod);

        const futureValue = p * Math.pow((1 + (r / n)), n * t);
        const interest = futureValue - p;
        setResult(`Compound Interest: ₹${interest.toFixed(2)} (Future Value: ₹${futureValue.toFixed(2)})`);
        toggleModal();
    };

    const calculateSavingsGrowth = () => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100;
        const t = parseFloat(timePeriod);

        const futureValue = p * Math.pow(1 + r, t);
        setResult(`Savings Growth: ₹${futureValue.toFixed(2)}`);
        toggleModal();
    };

    const calculateInstallment = () => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
        const n = parseFloat(timePeriod) * 12; // Number of payments

        const installment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setResult(`Monthly Installment: ₹${installment.toFixed(2)}`);
        toggleModal();
    };

    const validateInput = () => {
        if (!principal.trim() || !interestRate.trim() || !timePeriod.trim()) {
            alert('All fields are required');
            return false;
        }
        return true;
    };

    const getCompoundingFrequency = (frequency) => {
        switch (frequency) {
            case 'annually':
                return 1;
            case 'semiannually':
                return 2;
            case 'quarterly':
                return 4;
            case 'monthly':
                return 12;
            default:
                return 1;
        }
    };

    const clearInputs = () => {
        setPrincipal('');
        setInterestRate('');
        setTimePeriod('');
        setCompoundFrequency('annually');
        setResult('');
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const toggleFormulaPopup = () => {
        setFormulaPopupVisible(!formulaPopupVisible);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.infoButton} onPress={toggleFormulaPopup}>
                <MaterialIcons name="info" size={24} color="#FF5722" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Principal Amount (₹)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Principal Amount"
                    keyboardType="numeric"
                    value={principal}
                    onChangeText={(text) => setPrincipal(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Interest Rate (%)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Interest Rate"
                    keyboardType="numeric"
                    value={interestRate}
                    onChangeText={(text) => setInterestRate(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Time Period (Years)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Time Period"
                    keyboardType="numeric"
                    value={timePeriod}
                    onChangeText={(text) => setTimePeriod(text)}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.radioGroup}>
                    <Text style={styles.radioLabel}>Compound Frequency:</Text>
                    <TouchableOpacity
                        style={[styles.radioButton, compoundFrequency === 'annually' && styles.radioButtonSelected]}
                        onPress={() => setCompoundFrequency('annually')}>
                        <Text style={styles.radioButtonText}>Annually</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, compoundFrequency === 'semiannually' && styles.radioButtonSelected]}
                        onPress={() => setCompoundFrequency('semiannually')}>
                        <Text style={styles.radioButtonText}>Half Yearly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, compoundFrequency === 'quarterly' && styles.radioButtonSelected]}
                        onPress={() => setCompoundFrequency('quarterly')}>
                        <Text style={styles.radioButtonText}>Quarterly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, compoundFrequency === 'monthly' && styles.radioButtonSelected]}
                        onPress={() => setCompoundFrequency('monthly')}>
                        <Text style={styles.radioButtonText}>Monthly</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={calculateLoanPayment}>
                <Text style={styles.buttonText}>Calculate Loan Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calculateSimpleInterest}>
                <Text style={styles.buttonText}>Calculate Simple Interest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calculateCompoundInterest}>
                <Text style={styles.buttonText}>Calculate Compound Interest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calculateSavingsGrowth}>
                <Text style={styles.buttonText}>Calculate Savings Growth</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calculateInstallment}>
                <Text style={styles.buttonText}>Calculate Installment</Text>
            </TouchableOpacity>
            {result && (<TouchableOpacity style={styles.clearButton} onPress={clearInputs}>
                <Text style={styles.buttonText}>Clear Inputs</Text>
            </TouchableOpacity>)}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Result:</Text>
                        <Text style={styles.modalResult}>{result}</Text>
                        <Pressable style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <FormulaInfoPopup visible={formulaPopupVisible} onClose={toggleFormulaPopup} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    radioButtonSelected: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    radioButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 16,
    },
    clearButton: {
        backgroundColor: '#FF5722',
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoButton: {
        position: 'absolute',
        top: 6,
        right: 16,
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalResult: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#FF5722',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FinancialCalculatorScreen;
