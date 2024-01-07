import { useState } from "react";
import { TextInput, View } from "react-native";

import globalStyles from "../constants/globalStyles";
import colors from "../constants/colors";

const SearchBox = ({onChangeTextCallback, placeholder, containerStyle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={{flex: 1, marginEnd: 100, marginStart: -16}}>
      <TextInput
        placeholder={placeholder}
        style={[globalStyles.inputBoxStyle, {flex: 1, ...containerStyle}]}
        placeholderTextColor={colors.default_text_color}
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          onChangeTextCallback(text);
        }}/>
    </View>
  );
}

export default SearchBox;
