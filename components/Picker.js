// PickerComponent.js
import React, { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

const PickerComponent = ({ selectedValue, onValueChange, items }) => {
    useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={{ height: 70, width: 300 }}
        >
            {items.length > 0 ? (
                items.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))
            ) : (
                <Picker.Item label="Loading..." value="" />
            )}
        </Picker>
    );
};

export default PickerComponent;