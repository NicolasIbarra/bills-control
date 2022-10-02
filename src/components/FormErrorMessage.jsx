function FormErrorMessage({message, type}) {

  return (
    <div className={`alerta ${type}`}>
        {message}
    </div>
  )
}

export default FormErrorMessage