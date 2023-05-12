import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import React from 'react';
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../context/config'
import manager from "../helper/manager";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const history = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        // let response = manager.accesstoken(e.target.username.value,e.target.password.value)
        let response = await fetch('https://muzamal-django-dot-cloud-work-314310.ew.r.appspot.com/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log('data: ',data)
        console.log('response: ',response)



        if(response.status === 200){
            console.log('In---------------------------------------------')
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }


    let updateToken = async ()=> {

        // let response = manager.refreshtoken(authTokens)
        let response = await fetch('https://muzamal-django-dot-cloud-work-314310.ew.r.appspot.com/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            // body:JSON.stringify({'refresh':authTokens?.refresh})
            body:JSON.stringify({'refresh': authTokens && authTokens.refresh})
            
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}