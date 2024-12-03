import React  from 'react';

const Button = ({label, onclick }) => {
    return (
        <button onclick={onclick}>
            {label}
        </button>
    );
};

export default Button;