import { useState } from 'react';
import s from './Loading.module.css';

export default function useLoading() {
    const [loading, setLoading] = useState(true);

    return {
        loading,
        setLoading,
        Loading: () => <>
            <div className={s.load}>
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
        </>
    }
}