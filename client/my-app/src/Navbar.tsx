import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"

const Navbar = (): JSX.Element => {
    const [selected, setSelected] = useState("")

    return  (

        <div className='navbar'>
            <div className='navbar-left'>
                <Button className={selected === "hello" ? 'navbar-item-selected' : 'navbar-item'} onClick={() => setSelected("hello")}>Hello</Button>
            </div>
            <div className='navbar-center'>
                <Button className={selected === "world" ? 'navbar-item-selected' : 'navbar-item'} onClick={() => setSelected("world")}>World</Button>
            </div>
            <div className='navbar-right'>
                <Button className={selected === "vishnu" ? 'navbar-item-selected' : 'navbar-item'} onClick={() => setSelected("vishnu")}>Vishnu</Button>
            </div>
        </div>
        

    )
}

export default Navbar