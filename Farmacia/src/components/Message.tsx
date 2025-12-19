import { useState } from "react"

const Message = ({ errorMessage = "" }) => {
    const [error, setError] = useState(true)
    const [message, setMessage] = useState("")




    return (
        <div className="errorMessages" style={{
        }}>
            {errorMessage}
        </div>
    )
}

export default Message
