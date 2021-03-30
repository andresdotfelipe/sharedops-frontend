import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layer = ({ children }) => {

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layer;