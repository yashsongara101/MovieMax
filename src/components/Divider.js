import { View } from "react-native";

import colors from "../constants/colors";

const Divider = () => {
  return (
    <View style={{
      height: 1,
      backgroundColor: colors.divider_color,
    }} />
  );
}

export default Divider;