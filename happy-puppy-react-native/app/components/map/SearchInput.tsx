import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchInputProps {
  query: string;
  onChangeQuery: (text: string) => void;
  onSubmit: () => void;
}

const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ query, onChangeQuery, onSubmit }, ref) => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="검색어 입력해주세요"
        value={query}
        onChangeText={onChangeQuery}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        ref={ref}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Ionicons name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  )
);

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 16,
    right: 16,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    zIndex: 1000,
    elevation: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  button: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default SearchInput;
