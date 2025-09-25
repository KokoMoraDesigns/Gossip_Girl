import React from "react";
import { motion } from 'framer-motion';


const overlayVariants = {
    initial: { opacity: 0.3 },
    animate: { opacity: 0 },
    exit: { opacity: 0.3 },
};

const TransitionOverlay = () => (
    <motion.div
        className='transition-overlay'
        variants={overlayVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.4, ease: 'easeInOut' }}
    />
);

export default TransitionOverlay;