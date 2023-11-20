//dropdown
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button} from '@nextui-org/react'

//hook
import { useTheme } from "next-themes"

//icons
import {BsSunFill, BsFillMoonFill} from 'react-icons/bs'

export default function DarkModeButton() {
    
    const { setTheme} = useTheme();

    return(
        <Dropdown>
            <DropdownTrigger>
                <Button>
                    <BsSunFill className='text-lg flex dark:hidden'/>
                    <BsFillMoonFill className='text-lg hidden dark:flex'/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onAction={() => setTheme('light')}>
                    Light
                </DropdownItem>
                <DropdownItem onAction={() => setTheme('dark')}>
                    Dark
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}