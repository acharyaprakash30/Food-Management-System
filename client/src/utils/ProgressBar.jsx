import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const App = () => {
    useEffect(() => {
        NProgress.start();

        // Simulating an async operation
        setTimeout(() => {
            NProgress.done();
        }, 2000);

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div>

        </div>
    );
};

export default App;
