'use client';

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterForm() {

    const [show, setShow] = useState(false)


    return(
        <form className="flex flex-col gap-6">
            <Input
                label='Username'
                type="text"
            />
            <Input
                label='Email'
                type="email"
            />
            <Input
                label='Password'
                endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <AiOutlineEye className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <AiOutlineEyeInvisible className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  type={show ? "password" : "text"}
            />
            <Input
                label='Confirm Password'
                endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <AiOutlineEye className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <AiOutlineEyeInvisible className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  type={show ? "password" : "text"}
            />
            <Button radius="full" size="md" color="primary">
                Register
            </Button>
        </form>
    )
}