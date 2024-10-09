import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import ForexRateStream from './forex'

const Navbar = (): JSX.Element => {
    const [selected, setSelected] = useState("")

    return  (
        <>
            <div className='navbar'>
                <div>
                    <Button className={selected === "hello" ? 'navbar-item-selected' : 'navbar-item'} onClick={() => setSelected("hello")}>Hello</Button>
                </div>
                <div>
                    <Button className={selected === "world" ? 'navbar-item-selected' : 'navbar-item'} onClick={() => setSelected("world")}>World</Button>
                </div>
                <div>
                    <Button className={selected === "vishnu" ? 'navbar-item-selected' : 'navbar-item'} onClick={() => setSelected("vishnu")}>Vishnu</Button>
                </div>
            </div>
            <ForexRateStream />
        </>
        
        

    )
}

export default Navbar