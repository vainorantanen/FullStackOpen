const Success = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="successfuladd">
        {message}
      </div>
    )
  }

export default Success