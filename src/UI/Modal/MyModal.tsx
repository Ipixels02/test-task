import React from 'react';
import cl from './MyModule.module.css'

const MyModal = ({children, visible, setVisible}:any) => {

    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e): any => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;