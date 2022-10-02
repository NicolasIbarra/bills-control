import Expense from "./Expense";

function ExpensesList({ deleteExpense, expenseFilter, expenseFilteredList, expenseList, setExpenseToEdit }) {
  return (
    <div className="listado-gastos contenedor">
      {
        expenseFilter
        ? (
          <>
            <h2>{expenseFilteredList.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>
            {
              expenseFilteredList.map((expense) => (
                <Expense
                  deleteExpense={deleteExpense}
                  expense={expense}
                  key={expense.id}
                  setExpenseToEdit={setExpenseToEdit}
                />
              ))
            }
          </>
        )
        : (
          <>
            <h2>{expenseList.length ? "Gastos" : "No hay gastos"}</h2>
            {
              expenseList.map((expense) => (
                <Expense
                  deleteExpense={deleteExpense}
                  expense={expense}
                  key={expense.id}
                  setExpenseToEdit={setExpenseToEdit}
                />
              ))
            }
          </>
        )
      }
    </div>
  );
}

export default ExpensesList;
