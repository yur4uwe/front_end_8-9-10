import React from 'react';

const styles = {
    number: { fontSize: '5rem', fontWeight: 'bold' },
    text: {

    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        color: 'var(--ghostly-text)',
        fontSize: '2rem',
        fontWeight: 'bold',
    }
}

const NotFound = () => {
    return (
        <div style={styles.container}>
            <div style={styles.number}>404</div>
            <div style={styles.text}>Page Not Found</div>
        </div>
    );
};

export default NotFound;