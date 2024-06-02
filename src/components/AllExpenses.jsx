import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const AllExpenses = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [sortOptions] = useState([
        { label: 'Sort By', value: '' },
        { label: 'Amount (Increasing)', value: 'amountAsc' },
        { label: 'Amount (Decreasing)', value: 'amountDesc' },
        { label: 'A-Z', value: 'aToZ' },
        { label: 'Z-A', value: 'zToA' },
        { label: 'Date (Newest First)', value: 'dateNewest' },
        { label: 'Date (Oldest First)', value: 'dateOldest' },
    ]);

    useEffect(() => {
        // Get unique categories
        const categories = Array.from(new Set(data.map(expense => expense.category)));

        // Create an array of objects { label: CategoryName, value: category }
        const categoryArray = categories.map(category => ({
            label: category,
            value: category.toLowerCase().replace(/\s/g, ''),
        }));

        // Add a default 'All Category' option
        categoryArray.unshift({ label: 'All', value: '' });

        // Set category options
        setCategoryOptions(categoryArray);
    }, [data]);

    // Filter expenses based on selected category, sorting option, and search query
    let filteredData = data;

    if (selectedCategory !== '') {
        filteredData = filteredData.filter(expense => expense.category.toLowerCase().replace(/\s/g, '') === selectedCategory);
    }

    switch (selectedSortOption) {
        case 'amountAsc':
            filteredData.sort((a, b) => a.amount - b.amount);
            break;
        case 'amountDesc':
            filteredData.sort((a, b) => b.amount - a.amount);
            break;
        case 'aToZ':
            filteredData.sort((a, b) => a.description.localeCompare(b.description));
            break;
        case 'zToA':
            filteredData.sort((a, b) => b.description.localeCompare(a.description));
            break;
        case 'dateNewest':
            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'dateOldest':
            filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        default:
            break;
    }

    if (searchQuery) {
        filteredData = filteredData.filter(
            (expense) =>
                expense.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                expense.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Function to handle search input change
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Function to export the expenses table as a CSV file
    const handleExport = async () => {
        const csvData = [
            ['ID', 'Category', 'Amount', 'Description', 'Date'],
            ...filteredData.map(expense => [
                expense.id,
                expense.category,
                expense.amount,
                expense.description,
                new Date(expense.date).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const fileName = 'expenses.csv';
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        // console.log(filePath);

        try {
            await FileSystem.writeAsStringAsync(filePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });
            await Sharing.shareAsync(filePath);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to export expenses. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Search input */}
            <TextInput
                style={[styles.searchInput, { flex: 1 }]}
                placeholder="Search expenses..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Category and Sort selectors */}
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    style={[styles.picker, { flex: 1, marginRight: 10 }]}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    {categoryOptions.map((category, index) => (
                        <Picker.Item key={index} label={category.label} value={category.value} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedSortOption}
                    style={[styles.picker, { flex: 1 }]}
                    onValueChange={(itemValue) => setSelectedSortOption(itemValue)}
                >
                    {sortOptions.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>

            <ScrollView horizontal={true}>
                <View>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={styles.cell}>ID</Text>
                        <Text style={styles.cell}>Category</Text>
                        <Text style={styles.cell}>Amount</Text>
                        <Text style={styles.cell}>Description</Text>
                        <Text style={styles.cell}>Date</Text>
                    </View>
                    {filteredData.map((expense, index) => (
                        <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                            <Text style={styles.cell}>{expense.id}</Text>
                            <Text style={styles.cell}>{expense.category}</Text>
                            <Text style={styles.cell}>{expense.amount}</Text>
                            <Text style={styles.cell}>{expense.description}</Text>
                            <Text style={styles.cell}>{new Date(expense.date).toLocaleDateString()}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            {/* Download button */}
            <TouchableOpacity style={styles.downloadButton} onPress={handleExport}>
                <Icon name="cloud-download" size={20} color="#fff" />
                <Text style={styles.downloadButtonText}>Download Expenses</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    picker: {
        height: 40,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: 4,
    },
    headerRow: {
        backgroundColor: '#4CAF50',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        padding: 10,
        width: 100,
    },
    evenRow: {
        backgroundColor: '#f2f2f2',
    },
    oddRow: {
        backgroundColor: '#fff',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 2,
        padding: 12,
        marginVertical: 16,
    },
    downloadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 6,
    },
});

export default AllExpenses;
