import {
    faEnvelope,
    faKey,
    faMoon,
    faFeather,
    faNewspaper
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';



const Icons = () => {
    return library.add(
        faEnvelope,
        faKey,
        faMoon,
        faFeather,
        faNewspaper
    );
};

export default Icons;