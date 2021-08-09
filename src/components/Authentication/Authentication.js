import {useState} from 'react'
import { auth } from "../../services/FirebaseConfig"
import {useHistory} from 'react-router-dom'

export default function Authentication() {

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [Error, setError] = useState(null)
    const [MessageSuccess, setMessageSuccess] = useState(null)
    const history = useHistory()
    const [SessionMode, setSessionMode] = useState(null)

    const RegisterUser = async (eve)=>{
        eve.preventDefault()

        if(!email.trim()){
            setError('Debe Introducir un Email')
            setMessageSuccess(null)
        }else if(!pass.trim()){
            setError('Debe Introducir un Pass')
            setMessageSuccess(null)
        }else{
            //registro de ususario
            await auth.createUserWithEmailAndPassword(email, pass)
            .then((auth)=>{
                if(auth){
                    setError(null)
                    setMessageSuccess('Se a Registrado con Exito')
                    history.push('/')
                }
            })
            .catch(error =>{
                if(error.code === 'auth/email-already-in-use'){
                    setError('El Email ya esta Registrado')
                    setMessageSuccess(null)
                    setemail('')
                }else if(error.code === 'auth/weak-password'){
                    setError('La Contraseña debe tener Minimo 6 caracteres')
                }
            })
        }
    }
    
    const LoginUSer = async (eve)=>{
        eve.preventDefault()

        if(!email.trim()){
            setError('Debe Introducir un Email')
            setMessageSuccess(null)
        }else if(!pass.trim()){
            setError('Debe Introducir un Pass')
            setMessageSuccess(null)
        }else{
            //login ususario
            await auth.signInWithEmailAndPassword(email, pass)
                .then(auth=>{
                    if(auth){
                        setError(null)
                        setMessageSuccess('Se a loqueado Correctamente')

                        history.push('/')
                    }
                })
                .catch(error=>{
                    if(error.code === 'auth/user-not-found'){
                        setMessageSuccess(null)
                        setemail('')
                        setError('El Email no es Correcto o no Existe')
                    }else if(error.code === 'auth/wrong-password'){
                        setMessageSuccess(null)
                        setError('La Contraseña es Incorrecta')
                        setpass('')
                    }
                })
        }
    }

    const ModeSession = ()=>{
        if(SessionMode === null){
            setemail('')
            setpass('')
            setSessionMode('login')
        }else{
            setemail('')
            setpass('')
            setSessionMode(null)
        }
    }
    return (
        <div>
            <form onSubmit={ SessionMode ?RegisterUser: LoginUSer} 
                className='m-auto w-50 text-center form-group'>
                
                <h1 className='mt-3'>
                    {SessionMode ? 'Registro de Usuario' : 'Inicia Session'}
                </h1>

                <input onChange={(eve)=>setemail(eve.target.value)}
                    className='form-control mt-5 mb-2' 
                    type='email' 
                    placeholder='Entre su Email'
                    value={email}
                />
                
                <input onChange={(eve)=>setpass(eve.target.value)}
                    className='form-control mb-3' 
                    type='password' 
                    placeholder='Entre su Contraseña'
                    value={pass}
                />

                <button 
                    className='btn btn-dark'>
                    {SessionMode ? 'Registrarse' : 'Iniciar Session'}
                </button>

                <span className='loginChange mt-1'>
                    {SessionMode ? 'Estas Registrado has' : 'No estas Registrado has'}  
                    <span onClick={ModeSession} className='click'>Click Aqui</span>
                </span>

            </form>

            {
                Error ?
                ( 
                    <div className='alert alert-danger m-auto text-center mt-3 w-50'>
                        {Error}
                    </div>
                )
                :
                (<span></span>)
            }

            {
                MessageSuccess ?
                (
                    <div className='alert alert-success m-auto text-center mt-3 w-50'>
                        {MessageSuccess}
                    </div>
                )
                :
                (
                    <span></span>
                )
            }
        </div>
    )
}
