import React from 'react';
import AppBar from "../components/Navigation/AppBar";

function Layout({ children }) {
    return (<>
        <AppBar/>
        <main>{children}</main>
    </>);
}

export default Layout;
