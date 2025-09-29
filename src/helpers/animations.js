
export const fadeVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: 'easeInOut' }
};

export const slideUpVariant = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0},
    exit: { opacity: 0, y: -40 },
    transition: { duration: 0.5, ease: 'easeOut' }
};

export const slideLeftVariant = {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
    transition: { duration: 0.5, ease: 'easeOut' }
};

export const zoomVariant = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.4, ease: 'easeInOut' }
};