import React from "react";
import { motion } from 'framer-motion';

const PageTransition = ({ children, variant }) => (
    <motion.div
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={variant.transition}
        style={{ height: '100%' }}
    >
        {children}
    </motion.div>
);

export default PageTransition;