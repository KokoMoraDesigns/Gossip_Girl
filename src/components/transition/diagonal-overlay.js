import React from 'react';
import { motion } from 'framer-motion';

const overlayVariants = {
    initial: { x: '-100%', skewX: '-20deg' },
    animate: { x: '100%', skewX: '-20deg' },
    exit: { x: '0%', skewX: '-20deg' }
};

const DiagonalOverlay = () => (
    <motion.div
        className='diagonal-overlay'
        variants={overlayVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.7, ease: 'easeInOut' }}
    />
);

export default DiagonalOverlay;