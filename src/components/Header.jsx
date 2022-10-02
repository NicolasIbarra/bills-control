import React from "react";
import BudgetControl from "./BugdetControl";
import NewBudget from "./NewBudget";

function Header(props) {

  const {
    expenseList,
    setExpenseList,
    newBudget, 
    setNewBudget, 
    isValidBudget, 
    setIsValidBudget
  } = props;

  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidBudget
      ? ( 
          <BudgetControl
            expenseList={expenseList}
            newBudget={newBudget}
            setIsValidBudget={setIsValidBudget}
            setExpenseList={setExpenseList}
            setNewBudget={setNewBudget}
          />
        )
      : (
        <NewBudget
          newBudget = {newBudget}
          setNewBudget = {setNewBudget}
          setIsValidBudget = {setIsValidBudget}
        />
      )}

    </header>
  );
}

export default Header;
