import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import FormulaInfoPopup from "../../components/FormulaInfoPopup";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

const FinancialCalculatorScreen = () => {
    const [principal, setPrincipal] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [timePeriod, setTimePeriod] = useState("");
    const [compoundFrequency, setCompoundFrequency] = useState("annually");
    const [result, setResult] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [formulaPopupVisible, setFormulaPopupVisible] = useState(false);
    const [selectedFunction, setSelectedFunction] = useState("type");

    const handleFunctionChange = (functionName) => {
        setSelectedFunction(functionName);
    };

    const calculate = () => {
        functions[selectedFunction].calculate();
    };

    const calculateLoanPayment = useCallback(() => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
        const n = parseFloat(timePeriod) * 12; // Number of payments

        const monthlyPayment =
            (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setResult(`Monthly Payment: ₹${monthlyPayment.toFixed(2)}`);
        toggleModal();
    }, [principal, interestRate, timePeriod]);

    const calculateSimpleInterest = useCallback(() => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate);
        const t = parseFloat(timePeriod);

        const interest = (p * r * t) / 100;
        const futureValue = p + interest;
        setResult(
            `Simple Interest: ₹${interest.toFixed(
                2
            )} (Total Amount: ₹${futureValue.toFixed(2)})`
        );
        toggleModal();
    }, [principal, interestRate, timePeriod]);

    const calculateCompoundInterest = useCallback(() => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100; // Annual interest rate
        const n = getCompoundingFrequency(compoundFrequency);
        const t = parseFloat(timePeriod);

        const futureValue = p * Math.pow(1 + r / n, n * t);
        const interest = futureValue - p;
        setResult(
            `Compound Interest: ₹${interest.toFixed(
                2
            )} (Future Value: ₹${futureValue.toFixed(2)})`
        );
        toggleModal();
    }, [principal, interestRate, timePeriod, compoundFrequency]);

    const calculateSavingsGrowth = useCallback(() => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100;
        const t = parseFloat(timePeriod);

        const futureValue = p * Math.pow(1 + r, t);
        setResult(`Savings Growth: ₹${futureValue.toFixed(2)}`);
        toggleModal();
    }, [principal, interestRate, timePeriod]);

    const calculateInstallment = useCallback(() => {
        if (!validateInput()) return;

        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
        const n = parseFloat(timePeriod) * 12; // Number of payments

        const installment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setResult(`Monthly Installment: ₹${installment.toFixed(2)}`);
        toggleModal();
    }, [principal, interestRate, timePeriod]);

    const validateInput = useCallback(() => {
        if (!principal.trim() || !interestRate.trim() || !timePeriod.trim()) {
            alert("All fields are required");
            return false;
        }
        return true;
    }, [principal, interestRate, timePeriod]);

    const getCompoundingFrequency = useCallback((frequency) => {
        switch (frequency) {
            case "annually":
                return 1;
            case "semiannually":
                return 2;
            case "quarterly":
                return 4;
            case "monthly":
                return 12;
            default:
                return 1;
        }
    }, []);

    const clearInputs = useCallback(() => {
        setPrincipal("");
        setInterestRate("");
        setTimePeriod("");
        setCompoundFrequency("annually");
        setSelectedFunction("type");
        setResult("");
    }, []);

    const toggleModal = useCallback(() => {
        setModalVisible(!modalVisible);
    }, [modalVisible]);

    const toggleFormulaPopup = useCallback(() => {
        setFormulaPopupVisible(!formulaPopupVisible);
    }, [formulaPopupVisible]);

    const functions = {
        type: {
            label: "Select Calculator",
            calculate: () => { alert("Select Calculator!") }
        },
        loanPayment: {
            label: "Loan Payment",
            calculate: calculateLoanPayment,
        },
        simpleInterest: {
            label: "Simple Interest",
            calculate: calculateSimpleInterest,
        },
        compoundInterest: {
            label: "Compound Interest",
            calculate: calculateCompoundInterest,
        },
        savingsGrowth: {
            label: "Savings Growth",
            calculate: calculateSavingsGrowth,
        },
        installment: {
            label: "Installment",
            calculate: calculateInstallment,
        },
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity style={styles.infoButton} onPress={toggleFormulaPopup}>
                <MaterialIcons name="info" size={24} color="#f44336" />
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

            {selectedFunction == "compoundInterest" && (
                <View style={styles.radioGroup}>
                    <Text style={styles.label}>Compound Frequency:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {["annually", "semiannually", "quarterly", "monthly"].map(
                            (frequency) => (
                                <TouchableOpacity
                                    key={frequency}
                                    style={[
                                        styles.radioButton,
                                        compoundFrequency === frequency &&
                                        styles.radioButtonSelected,
                                    ]}
                                    onPress={() => setCompoundFrequency(frequency)}
                                >
                                    <Text style={styles.radioButtonText}>
                                        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                </View>
            )}

            <Picker
                selectedValue={selectedFunction}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    handleFunctionChange(itemValue)
                }
            >
                {Object.keys(functions).map((key) => (
                    <Picker.Item key={key} label={functions[key].label} value={key} />
                ))}
            </Picker>

            <TouchableOpacity style={styles.button} onPress={calculate}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            {result && (
                <TouchableOpacity style={styles.clearButton} onPress={clearInputs}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
            )}

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

            <FormulaInfoPopup
                visible={formulaPopupVisible}
                onClose={toggleFormulaPopup}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // padding: 16,
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
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
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    radioGroup: {
        marginBottom: 16,
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    radioButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    radioButtonSelected: {
        backgroundColor: "#8BC34A",
        borderColor: "#8BC34A",
    },
    radioButtonText: {
        color: "#333",
        fontSize: 14,
        fontWeight: "bold",
    },
    picker: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 16,
    },
    clearButton: {
        backgroundColor: "#f44336",
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    infoButton: {
        position: "absolute",
        top: 6,
        right: 16,
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalResult: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#f44336",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default FinancialCalculatorScreen;
