import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className="Notification">
            {notification.text}
        </div>
    )
}

export default Notification