import { ComponentProps } from "react";

type Navlinkprops = ComponentProps<'li'> & {
    name?: string,
}

export default function Navlink({ name }: Navlinkprops) {
    return (
        <li
            className="text-lg font-semibold list-none hover:scale-[1.02]"
        >
            {name}
        </li>
    )
}