import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
    const { toggleTheme, colors, theme } = useTheme();

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={toggleTheme}
        >
            <Text style={[styles.icon, { color: colors.text }]}>
                {theme === 'light' ? '☾' : '☼'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    icon: {
        fontSize: 24,
    },
});