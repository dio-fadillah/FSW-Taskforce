import { useEffect, useState } from "react";
import { InitialUserState, useUser } from "./user";
import { Authentication } from "../services/firebase";
import { Spinner } from "reactstrap";

const AuthStateChangeProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const user = useUser()
    const { SetUser } = user


    const InitiateAuthStateChange = () => {
        Authentication().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is authenticated')
                SetUser({ email: user.email, uid: user.uid})
            }
            else {
                console.log('User is not authenticated')
                SetUser(InitialUserState)
            }
            setIsLoading(false)
        })
    }
   
    useEffect (() => {
        InitiateAuthStateChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return children
}

export default AuthStateChangeProvider