import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../constants/colors";
import globalStyles from "../constants/globalStyles";
import { Chip } from ".";

const ChipGroup = ({
  chipsData,
  onChipPressed,
  multiselectable = false,
}) => {
  const [selectedChipIds, setSelectedChipIds] = useState([]);

  useEffect(() => {
    setSelectedChipIds(multiselectable ? ['ALL'] : []);
  }, [multiselectable]);

  const getChipsData = () => {
    if (!multiselectable)
      return chipsData;

    const selectedChips = [];
    const unselectedChips = [];
   
    chipsData?.forEach(chipData => {
      const { key } = chipData;

      if(selectedChipIds.includes(key)) {
        selectedChips.push(chipData);
      } else {
        unselectedChips.push(chipData);
      }
    });

    return [
      ...selectedChips, 
      {key: 'ALL', value: 'All'},
      ...unselectedChips
    ];
  }

  const renderChipItem = ({item}) => {
    const { key, value } = item;
    const isSelected = selectedChipIds.includes(key);

    const onChipPress = () => {
      let selectedChips = [];

      if ( multiselectable ) {
        if(selectedChipIds.includes('ALL') || key === 'ALL') {
          selectedChips = [key];
        } else {
          selectedChips = [...selectedChipIds, key];
        }
      } else {
        selectedChips = [key];
      }

      if(selectedChipIds.includes(key)) {
        selectedChips = selectedChipIds.filter((id) => id !== key);
      }

      setSelectedChipIds(selectedChips);
      if (onChipPressed) {
        onChipPressed( selectedChips.includes('ALL') ? chipsData.map(chip => chip.key) : selectedChips );
      }
    }

    return (
      <View style={[styles.chipViewContainerStyle]}>
        <Chip
          label={value}
          chipStyle={isSelected ? globalStyles.chipSelectedStyle : globalStyles.chipUnselectedStyle}
          labelStyle={isSelected ? globalStyles.chipLabelSelectedStyle : globalStyles.chipLabelUnselectedStyle}
          onPressed={onChipPress}/>
      </View>
    )
  }

  return (
    <View>
      <FlatList 
        data={getChipsData()}
        renderItem={renderChipItem}
        keyExtractor={item => item.key}
        contentContainerStyle={[styles.containerStyle]}
        showsHorizontalScrollIndicator={false}
        horizontal/>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  chipViewContainerStyle: {
    marginEnd: 8
  }
});

export default ChipGroup;
