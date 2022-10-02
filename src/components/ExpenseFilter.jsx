function ExpenseFilter({expenseFilter, setExpenseFilter}) {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtros</label>
          <select
            value={expenseFilter}
            onChange={e => setExpenseFilter(e.target.value)}
          >
            <option value="">-- Todas las categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default ExpenseFilter;
