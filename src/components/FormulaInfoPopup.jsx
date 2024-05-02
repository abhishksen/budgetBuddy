import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';

const FormulaInfoPopup = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Formulas</Text>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.formulaContainer}>
                            <Text style={styles.formulaName}>Loan Payment:</Text>
                            <Text style={styles.formula}>Monthly Payment = (Principal * Monthly Interest Rate * (1 + Monthly Interest Rate)^Number of Payments) / ((1 + Monthly Interest Rate)^Number of Payments - 1)</Text>
                        </View>
                        <View style={styles.formulaContainer}>
                            <Text style={styles.formulaName}>Simple Interest:</Text>
                            <Text style={styles.formula}>Interest = (Principal * Interest Rate * Time Period) / 100</Text>
                        </View>
                        <View style={styles.formulaContainer}>
                            <Text style={styles.formulaName}>Compound Interest:</Text>
                            <Text style={styles.formula}>Future Value = Principal * (1 + Annual Interest Rate / Compounding Frequency)^(Compounding Frequency * Time Period)</Text>
                            <Text style={styles.formula}>Compound Interest = Future Value - Principal</Text>
                        </View>
                        <View style={styles.formulaContainer}>
                            <Text style={styles.formulaName}>Savings Growth:</Text>
                            <Text style={styles.formula}>Future Value = Principal * (1 + Annual Interest Rate)^Time Period</Text>
                        </View>
                        <View style={styles.formulaContainer}>
                            <Text style={styles.formulaName}>Installment:</Text>
                            <Text style={styles.formula}>Monthly Installment = (Principal * Monthly Interest Rate * (1 + Monthly Interest Rate)^Number of Payments) / ((1 + Monthly Interest Rate)^Number of Payments - 1)</Text>
                        </View>
                    </ScrollView>
                </View>
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        alignItems: 'flex-start',
        elevation: 5,
        width: '90%', // Adjust the width of the modal content
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF5722',
        marginBottom: 16,
    },
    scrollView: {
        maxHeight: 300, // Limit the height of the scroll view
    },
    formulaContainer: {
        marginBottom: 10,
    },
    formulaName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 5,
    },
    formula: {
        marginBottom: 5,
    },
    closeButton: {
        backgroundColor: '#FF5722',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 18,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default FormulaInfoPopup;
