import type { SelectChangeEvent } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import type { FC } from 'react';

type Option = {
    id: number;
    value: number | string;
};

type CustomSelectProps = {
    value?: string | number;
    data: Option[] | undefined;
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
                {data?.map((option) => (
                    <MenuItem
                        key={option.id}
                        value={option.value}
                    >
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
