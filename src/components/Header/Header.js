import {Link, useHistory} from 'react-router-dom'
import './Header.css'
import { auth } from '../../services/FirebaseConfig'
import {useEffect, useState} from 'react'


export default function Header() {
    const [session, setsession] = useState(null)
    const history = useHistory()

    const LogOut = ()=>{
        auth.signOut()
            .then(()=>{
                console.log('Cerraste Session');
                history.push('/authentication')
            })
            .catch((error)=>{
                alert(error)
            })
    }

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setsession(user.email)
                console.log(user);
            }else{
                setsession(null)
                console.log('No esta loqueado');
            }
        })
    },[])
    
    return (
        <div>
            <nav className='navbar navbar-expand navbar-dark bg-dark'>
                <ul className='navbar-nav float-left d-flex align-items-center'>
                    <li className='nav-item'>
                        <Link className='nav-link navbar-brand home h1' to="/">Home</Link>
                    </li>

                    {
                        session == null ?
                        (
                            <li className='nav-item'>
                                <Link className='nav-link' to="/authentication">Authentication</Link>
                            </li>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </ul>
                {
                    session ? 
                    (
                        <div style={{marginRight: '0.5rem'}} className='w-100 d-flex justify-content-end'>
                            <button onClick={LogOut} 
                                className='btn btn-danger'>
                                Cerrar Session
                            </button>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}
