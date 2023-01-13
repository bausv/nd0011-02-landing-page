/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * This function is taken from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 * @param el the element that should be checked
 * @returns {boolean} whether the element is currently in the viewport
 */
const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}

/**
 * This method is used for creating an anchor element for a given section in the navigation
 * @param section the section to be included in the navigation
 * @returns {HTMLAnchorElement} the anchor element
 */
const createAnchorElement = (section) => {
    const anchorElement = document.createElement('a');
    anchorElement.id = 'anchor-' + section.id;
    anchorElement.dataset.sectionId = section.id;
    anchorElement.addEventListener("click", event => scrollToSection(event, section));
    anchorElement.innerText = section.dataset.nav;
    return anchorElement;
}

/**
 * This method is used for creating a <code>li</code> navigation item for a given section
 * @param section the section to be included in the navigation
 * @returns {HTMLLIElement} the list item element
 */
function createNavItem(section) {
    const navItem = document.createElement('li');
    const anchorElement = createAnchorElement(section);
    navItem.appendChild(anchorElement)
    navItem.classList.add('menu__link');
    return navItem;
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const populateNavbar = () => {
    const navbarList = document.getElementById('navbar__list');
    for (const section of sections) {
        navbarList.appendChild(createNavItem(section));
    }
}

// Add class 'active' to section when near top of viewport
const updateActiveFlagOnScrollForSections = () => {
    let alreadySet = false;
    for (const section of sections) {
        alreadySet = addOrRemoveActiveFlagOnScroll(section, alreadySet);
    }
}

// Scroll to anchor ID using scrollTO event
/**
 * This function scrolls a section into the visible viewport, considering the navigation bar
 * @param section the section to be scrolled into the viewport
 */
const scrollIntoView = (section) => {
    let rect = document.getElementById('navbar__list').getBoundingClientRect();
    window.scrollTo({
        behavior: 'smooth',
        // set the top taking the navigation bar into account!
        top: section.getBoundingClientRect().top - document.body.getBoundingClientRect().top - rect.height,
    })
}


/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener('scroll', updateActiveFlagOnScrollForSections, {passive: true});

// Build menu
const initPage = (_event) => {
    populateNavbar();
}

// Scroll to section on link click
const scrollToSection = (event, section) => {
    scrollIntoView(section);
    event.preventDefault();
}

// Set sections as active
const addOrRemoveActiveFlagOnScroll = (section, alreadySet) => {
    let activeFlagSet = false;
    const elementsByTagName = section.getElementsByTagName('h2');
    if (elementsByTagName && elementsByTagName.length > 0) {
        if (!alreadySet && isInViewport(elementsByTagName.item(0))) {
            section.classList.add('your-active-class');
            document.getElementById('anchor-' + section.id).classList.add('menu__active');
            activeFlagSet = true;
        } else {
            section.classList.remove('your-active-class');
            document.getElementById('anchor-' + section.id).classList.remove('menu__active');
        }
    }
    return activeFlagSet;
}

