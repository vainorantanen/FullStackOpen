import React from 'react';

const Filter = ({ filter, handleFilterChange }) => (
  //console.log(filter, handleFilterChange)
  <div>
    <form>
      <div>
        filter shown with <input 
          value={filter} 
          onChange={handleFilterChange}
        />
      </div>
    </form>
  </div>
)

export default Filter;