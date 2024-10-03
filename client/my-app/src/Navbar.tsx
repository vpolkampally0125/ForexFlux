import './App.css'
import { Button } from "@/components/ui/button"

const Navbar = (): JSX.Element => {

    return  (

        <div className='navbar'>
            <div className='navbar-left'>
                <Button>Hello</Button>
            </div>
            <div className='navbar-center'>
                <Button>World</Button>
            </div>
            <div className='navbar-right'>
                <Button>Vishnu</Button>
            </div>
        </div>
        

    )
}

export default Navbar