import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const AllExpenses = ({ data }) => {
    const [filter, setFilter] = useState('');
    const allKeys = Object.keys(data[0]);

    // Function to filter expenses based on selected key
    const filterExpenses = (key) => {
        return data.filter(expense => {
            return expense[key].toLowerCase().includes(filter.toLowerCase());
        });
    };

    // Render header row with all keys
    const renderHeader = () => {
        return allKeys.map((key, index) => (
            <Text key={index} style={styles.headerText}>{key}</Text>
        ));
    };

    // Render table rows
    const renderRows = () => {
        return data.map((expense, index) => (
            <Row
                key={index}
                data={allKeys.map(key => expense[key])}
                textStyle={styles.rowText}
                style={[styles.row, index % 2 === 1 && { backgroundColor: '#f9f9f9' }]} // Alternating row colors
            />
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>All Expenses</Text>
            {/* Filter input */}
            <View style={styles.filterContainer}>
                {allKeys.map((key, index) => (
                    <Text key={index} style={styles.filterText}>{key}</Text>
                ))}
                <TextInput
                    style={styles.filterInput}
                    placeholder="Filter..."
                    value={filter}
                    onChangeText={text => setFilter(text)}
                />
            </View>
            {/* Table */}
            <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
                <Row data={renderHeader()} style={styles.header} textStyle={styles.headerText} />
                {renderRows()}
            </Table>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#2C3E50',
        textAlign: 'center',
    },
    header: {
        height: 50,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    row: {
        height: 50,
        width: '100%',

    },
    rowText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        color: '#2C3E50', // Text color
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2C3E50', // Filter text color
    },
    filterInput: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        color: '#2C3E50', // Filter input text color
    },
});

export default AllExpenses;
