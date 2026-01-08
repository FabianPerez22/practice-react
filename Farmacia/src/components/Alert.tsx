import { useEffect, useState } from "react"

const Alert = ({ message }: { message: string}) => {
    const [messages, setMessage] = useState("")


    //className="errorMessages"

    useEffect(() => {
        setMessage(message)
        
    }, [message])

    return (
        <div className="errorMessages" style={{
        }}>
            {messages}
        </div>
    )
}

export default Alert
