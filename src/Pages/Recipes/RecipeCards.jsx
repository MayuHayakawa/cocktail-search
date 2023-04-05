<div>
{ filteredData.length != 0 && (
  <ul>
    {filteredData.map((value) => {
      return (
        <li key={value.idDrink}>
          {value.strDrink}
          {value.strDrinkThumb}
        </li>
      )
    })}
  </ul>
)}
</div>