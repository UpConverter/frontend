import { type AttemptCals } from '@api/generatedApi';
import { CustomButton } from '@components/UI/CustomButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

import { ConverterModule } from '../ConverterModule/ConverterModule';
import styles from './ConverterList.module.css';

type ConverterListProps = {
    lustUpconverters: AttemptCals;
};

export const ConverterList: FC<ConverterListProps> = ({ lustUpconverters }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <Box>
            {lustUpconverters.cals.slice(currentPage - 1, currentPage).map((cal, idx) => (
                <ConverterModule
                    attemptUpconverters={cal}
                    key={idx}
                />
            ))}
            <Box className={styles.centerConatiner}>
                <CustomButton
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                >
                    <ArrowBackIosIcon />
                </CustomButton>
                <CustomButton
                    disabled={currentPage >= lustUpconverters.cals.length}
                    onClick={handleNextPage}
                >
                    <ArrowForwardIosIcon />
                </CustomButton>
            </Box>
        </Box>
    );
};
