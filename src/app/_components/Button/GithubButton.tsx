'use client';

import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react'
import { BsGithub } from 'react-icons/bs'

export default function GithubButton() {

    const handleClick = () => {
        signIn('github', { callbackUrl: 'http://localhost:3000/' })
    }

    return (
        <Button radius='full' color='primary' size='md' onClick={handleClick}>
            <BsGithub /> Login with Github
        </Button>
    )
}