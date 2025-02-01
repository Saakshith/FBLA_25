import React from 'react';
import '../../find_jobs/filters/Filters.css';

const Filters = ({ filters, setFilters }) => {

  const handleSalaryChange = (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      salary: parseInt(event.target.value)
    }));
  };

  const handleLocationChange = (location) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      locations: prevFilters.locations?.includes(location)
        ? prevFilters.locations.filter(l => l !== location)
        : [...(prevFilters.locations || []), location]
    }));
  };

  const handleWorkTypeChange = (workType) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      workType: prevFilters.workType?.includes(workType)
        ? prevFilters.workType.filter(w => w !== workType)
        : [...(prevFilters.workType || []), workType]
    }));
  };

  const handleTagChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilters(prevFilters => ({
      ...prevFilters,
      searchTag: value
    }));
  };

  return (
    <div className='filters'>
      <div className="filters-section">
        <h4 className="filter-section-heading filter-section-heading-large">Filter</h4>
        <input
          type="text"
          placeholder='Company, Skill, Tag...'
          className='filter-search'
          value={filters.searchTag || ""}  
          onChange={handleTagChange}
        />
      </div>

      {/* Salary Range */}
      <div className="filters-section">
        <h4 className="filter-section-heading">Salary Range</h4>
        <div className="slider-container">
          <input
            type="range"
            min="12"
            max="60"
            step="1"
            value={filters.salary || 12}
            onChange={handleSalaryChange}
            className="salary-slider"
          />
          <div
            className="salary-value"
            style={{ left: `${(((filters.salary || 12) - 12) / 48) * 100}%` }}
          >
            ${filters.salary || 12}+
          </div>
        </div>
      </div>

      {/* Location Filters */}
      <div className="filters-section">
        <h3 className="filter-section-heading">Location</h3>
        {['Bothell, WA', 'Woodinville, WA', 'Kenmore, WA', 'Mill Creek, WA'].map(location => (
          <label className="container" key={location}>
            {location}
            <input
              type="checkbox"
              checked={filters.locations?.includes(location) || false}
              onChange={() => handleLocationChange(location)}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>

      {/* Work Type Filters */}
      <div className="filters-section">
        <h3 className="filter-section-heading">Work Type</h3>
        {['Remote', 'In-Person', 'Hybrid'].map(workType => (
          <label className="container" key={workType}>
            {workType}
            <input
              type="checkbox"
              checked={filters.workType?.includes(workType) || false}
              onChange={() => handleWorkTypeChange(workType)}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
