import React, { useEffect } from 'react';

function ButtonScrollToTop(props) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    useEffect(() => {
        window.addEventListener('scroll', isAppear);
        return () => {
            window.removeEventListener('scroll', isAppear);
        };
    });
    const isAppear = () => {
        const scrollButton = document.querySelector('.scroll-to-top-btn');
        const scrollTop = window.scrollY;
        scrollTop >= 160 ? scrollButton.classList.add('is-appear') : scrollButton.classList.remove('is-appear');
    };
    return (
        <a className="scroll-to-top-btn" onClick={() => scrollToTop()}>
            <i className="fas fa-arrow-up"></i>
        </a>
    );
}

export default ButtonScrollToTop;