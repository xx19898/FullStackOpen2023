import "./App.css"


const FilterComponent = ({setFilter}) => {
    return(
      <>
      <h2>Filter</h2>
      <div className="filter-component">
          Filter shown with:<input onChange={(e) => {setFilter(e.target.value.toLowerCase())}}/>
      </div>
      </>
    )
}

export default FilterComponent