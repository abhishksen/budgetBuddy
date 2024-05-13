// import { Picker } from '@react-native-picker/picker';
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';

// const AllExpenses = ({ data }) => {
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [categoryOptions, setCategoryOptions] = useState([]);

//     useEffect(() => {
//         // Get unique categories
//         const categories = Array.from(new Set(data.map(expense => expense.category)));

//         // Create an array of objects { label: CategoryName, value: category }
//         const categoryArray = categories.map(category => ({
//             label: category,
//             value: category.toLowerCase().replace(/\s/g, ''),
//         }));

//         // Add a default 'All Category' option
//         categoryArray.unshift({ label: 'All', value: '' });

//         // Set category options
//         setCategoryOptions(categoryArray);
//     }, [data]);

//     // Filter expenses based on selected category
//     const filteredData = selectedCategory === '' ? data : data.filter(expense => expense.category === selectedCategory);

//     return (
//         <View style={styles.container}>
//             {/* <Text style={styles.text}>All Expenses</Text> */}
//             {/* Category selector */}
//             <View>
//                 <Picker
//                     selectedValue={selectedCategory}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//                 >
//                     {categoryOptions.map((category, index) => (
//                         <Picker.Item key={index} label={category.label} value={category.value} />
//                     ))}
//                 </Picker>
//             </View>
//             <ScrollView horizontal={true}>
//                 <View>
//                     <View style={[styles.row, styles.headerRow]}>
//                         <Text style={styles.cell}>ID</Text>
//                         <Text style={styles.cell}>Category</Text>
//                         <Text style={styles.cell}>Amount</Text>
//                         <Text style={styles.cell}>Description</Text>
//                         <Text style={styles.cell}>Date</Text>
//                     </View>
//                     {filteredData.map((expense, index) => (
//                         <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
//                             <Text style={styles.cell}>{expense.id}</Text>
//                             <Text style={styles.cell}>{expense.category}</Text>
//                             <Text style={styles.cell}>{expense.amount}</Text>
//                             <Text style={styles.cell}>{expense.description}</Text>
//                             <Text style={styles.cell}>{new Date(expense.date).toLocaleDateString()}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 4,
//         backgroundColor: '#fff',
//     },
//     text: {
//         fontSize: 20,
//         textAlign: 'center',
//         padding: 10,
//     },
//     picker: {
//         height: 40,
//         width: '100%',
//         backgroundColor: '#f2f2f2',
//         marginBottom: 10,
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 0.5,
//         paddingVertical: 4,
//     },
//     headerRow: {
//         backgroundColor: '#4CAF50',
//     },
//     cell: {
//         flex: 1,
//         textAlign: 'left',
//         padding: 10,
//         width: 100,
//     },
//     evenRow: {
//         backgroundColor: '#f2f2f2',
//     },
//     oddRow: {
//         backgroundColor: '#fff',
//     },
// });

// export default AllExpenses;

import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AllExpenses = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState('');
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

    // Filter expenses based on selected category and sorting option
    let filteredData = data;

    if (selectedCategory !== '') {
        filteredData = filteredData.filter(expense => expense.category === selectedCategory);
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

    return (
        <View style={styles.container}>
            {/* Category selector */}
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

                {/* Sort selector */}
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
});

export default AllExpenses;
