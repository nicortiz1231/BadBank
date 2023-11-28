import React from 'react';
import Card from './card';

function Home() {
    return (
        <Card
            txtcolor="black"
            header="Bad Bank"
            width="30rem"
            title="Welcome to Bad Bank"
            text='Use the menu above to navigate through your account!'
            body={(<img src="logo800.png" width="800" className="img-fluid" alt="Bad Bank Logo" />)}
        />
    );
}

export default Home;
