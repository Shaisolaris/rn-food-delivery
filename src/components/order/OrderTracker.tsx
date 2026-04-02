import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../../theme/index.js";
import type { TrackingStep } from "../../types/index.js";

export function OrderTracker({ steps }: { steps: TrackingStep[] }) {
  return (
    <View style={styles.container}>
      {steps.map((step, i) => (
        <View key={step.status} style={styles.step}>
          <View style={styles.indicator}>
            <View style={[styles.dot, step.completed && styles.dotCompleted, step.active && styles.dotActive]}>
              {step.completed && <Text style={styles.check}>✓</Text>}
            </View>
            {i < steps.length - 1 && (
              <View style={[styles.line, (step.completed || step.active) && styles.lineCompleted]} />
            )}
          </View>
          <View style={styles.labelWrap}>
            <Text style={[styles.label, (step.completed || step.active) && styles.labelActive]}>{step.label}</Text>
            {step.time && <Text style={styles.time}>{new Date(step.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: spacing.md },
  step: { flexDirection: "row", minHeight: 56 },
  indicator: { width: 32, alignItems: "center" },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  dotCompleted: { backgroundColor: colors.success, borderColor: colors.success },
  dotActive: { borderColor: colors.primary, borderWidth: 3 },
  check: { color: "#fff", fontSize: 11, fontWeight: "700" },
  line: { width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 2 },
  lineCompleted: { backgroundColor: colors.success },
  labelWrap: { flex: 1, marginLeft: spacing.md, paddingBottom: spacing.md },
  label: { fontSize: fontSize.md, color: colors.textMuted },
  labelActive: { color: colors.text, fontWeight: "600" },
  time: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
});
