import {useEffect, useState} from 'react'
import { auth } from '../../services/FirebaseConfig'

export default function Home() {

    const [EmailUser, setEmailUser] = useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setEmailUser(user.email)
            }else{
                console.log('no esta logueado');
            }
        })
    }, [])


    return (
        <div className='home-container'>
            <div className='home-user card text-white bg-dark' style={{maxWidth: '18rem'}}>
                <div className='card-header'>Usuario Logueado</div>
                <div className='card-body'>
                    <h5 className='card-title text-center'>{
                        EmailUser ?
                            (EmailUser)
                            :
                            ("Actualmente no hay Nadie logueado")
                    }</h5>
                </div>
            </div>
        </div>
    )
}
