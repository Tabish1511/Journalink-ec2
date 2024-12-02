"use client"

import {signIn, signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function Appbar(){
    const router = useRouter();

    return (
        <div>
            <button onClick={() => {
                signIn()
            }}>Signin</button>
            --
            <button onClick={() => {
                router.push('/signup')
            }}>Signup</button>
            --
            <button onClick={() => {
                signOut()
            }}>Logout</button>
        </div>
    )
}