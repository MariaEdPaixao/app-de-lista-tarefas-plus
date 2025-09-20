import React from 'react'
import { StyleSheet, View } from 'react-native'
import ThemeToggleButton from './ThemeToggleButton'
import LanguageToggleButton from './LanguageToggleButton'

export default function ToggleButtonsContainer() {
    return (
        <View style={styles.buttonsContainer}>
            <ThemeToggleButton />
            <LanguageToggleButton />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
    }
})
