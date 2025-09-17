import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function TaskCard({ task, onToggleComplete }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.input }]}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              textDecorationLine: task.completed ? "line-through" : "none",
            },
          ]}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text style={[styles.description, { color: colors.inputText }]}>
            {task.description}
          </Text>
        ) : null}

        {task.dueDate && typeof task.dueDate.toDate === "function" ? (
          <Text style={[styles.dueDate, { color: colors.text }]}>
            📅 {task.dueDate.toDate().toLocaleDateString("pt-BR")}
          </Text>
        ) : (
          <Text style={[styles.dueDate, { color: colors.text }]}>
            📅 Sem data
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.statusButton,
          { backgroundColor: task.completed ? "green" : "red" },
        ]}
        onPress={() => onToggleComplete(task.id)}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {task.completed ? "✔" : "✗"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
  },
  dueDate: {
    fontSize: 12,
    fontStyle: "italic",
  },
  statusButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
});
