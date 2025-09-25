import React from "react";
import { motion } from 'framer-motion';
import { zoomVariant } from "../../helpers/animations";

const PageTransition = ({ children, variant= zoomVariant}) => (
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