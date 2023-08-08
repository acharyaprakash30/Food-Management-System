
export const fadeInOut = {
    initial: { opacity: 0, transition: { duration: 0.5 } },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }

}
export const fade = {
    initial: { opacity: 0, transition: { duration: 1.5 } },
    animate: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0.2, transition: { duration: 1.5 } }

}

export const btnClick = {
    // whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }

}

export const slideTop = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
}

export const pop = {
    initial: { opacity: 0, y: 30, transition: { duration: 0.5 } },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.5 } },
};


export const straggerFadeInOut = (i) => {

    return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: 0.3, delay: i * 0.15 },
        key: { i },
    }
}

export const slideLeft = {
    initial: { opacity: 0, x: 30, },
    animate: { opacity: 1, x: 0, },
    exit: { opacity: 0, x: 30, }
}

export const error = {
    initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 1 }

}