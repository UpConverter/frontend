import type { SelectChangeEvent } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import type { FC } from 'react';

type Option = {
    value: string | number;
    label: string;
};

type CustomSelectProps = {
    value?: string | number;
    data: Option[];
    onChange?: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void;
    size?: 'small' | 'medium';
    className?: string;
};

export const CustomSelect: FC<CustomSelectProps> = ({ value, onChange, data, size, className }) => {
    return (
        <FormControl
            className={className}
            size={size}
        >
            <Select
                value={value}
                onChange={onChange}
            >
                {data.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
