import { useState } from "react";
import FormErrorMessage from "./FormErrorMessage";

function NewBudget({newBudget, setNewBudget, setIsValidBudget}) {

  const [formErrorMessage, setFormErrorMessage] = useState('');

  const handleFormValidation = e => {
    e.preventDefault();
    if(newBudget < 0 || !newBudget){
      setFormErrorMessage("El presupuesto ingresado no es válido");
      return;
    }
    setFormErrorMessage('');
    setIsValidBudget(true);
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>

        <form onSubmit={handleFormValidation} className='formulario'>
            <div className='campo'>
               <label>Defina su presupuesto</label> 
               <input
                 className='nuevo-presupuesto'
                 type='number'
                 value={newBudget}
                 onChange={e => setNewBudget(Number(e.target.value))}
               />
            </div>
            <input
                type='submit'
                value='Añadir'
            />
            {formErrorMessage && <FormErrorMessage message={formErrorMessage} type={'error'}/>}
        </form>

    </div>
  )
}

export default NewBudget