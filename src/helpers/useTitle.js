import React, { useEffect } from 'react'

export default function useTitle(title) {
    useEffect(() => {
        document.title = `Laz Store - ${title}`;
    }, [title]);
    
    return null;
}
