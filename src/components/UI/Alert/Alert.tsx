import type { AlertProps } from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import React, { forwardRef } from 'react';

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant='standard'
            {...props}
        />
    );
});
