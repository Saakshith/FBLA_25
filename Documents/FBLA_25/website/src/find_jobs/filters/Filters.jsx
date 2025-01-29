import React from 'react'
import {useState} from 'react'
import "./Filters.css"

const Filters = () => {

  const [salary, setSalary] = useState(12); // Default salary value

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  return (
    <div className='filters'>
        <div className="filters-section">
            <h4 className="filter-section-heading filter-section-heading-large">Filter</h4>
            <input type="text" placeholder='Company, Skill, Tag...' className='filter-search'/>
        </div>
        <div className="filters-section">
            <h4 className="filter-section-heading">Salary Range</h4>
            <div className="slider-container">
                <input 
                    type="range" 
                    min="12" 
                    max="60" 
                    step="1" 
                    value={salary} 
                    onChange={handleSalaryChange} 
                    className="salary-slider"
                />
                <div 
                    className="salary-value" 
                    style={{ left: `${((salary - 12) / 48) * 100}%` }}
                >
                    ${Number(salary).toLocaleString()}+
                </div>
            </div>
        </div>
        <div className="filters-section">
            <h3 className="filter-section-heading">Location</h3>
            <label class="container">Bothell, WA
                <input type="checkbox" />
                <span class="checkmark"></span>
            </label>

            <label class="container">Woodinville, WA
                <input type="checkbox" />
                <span class="checkmark"></span>
            </label>

            <label class="container">Kenmore, WA
                <input type="checkbox" />
                <span class="checkmark"></span>
            </label>

            <label class="container">Mill Creek, WA
                <input type="checkbox" />
                <span class="checkmark"></span>
            </label>
        </div>
        <div className="filters-section">
            <h3 className="filter-section-heading">Work Type</h3>
            <label class="container">Remote
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
            </label>

            <label class="container">In-Person
                <input type="checkbox" />
                <span class="checkmark"></span>
            </label>

            <label class="container">Hybrid
                <input type="checkbox" />
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
  )
}

export default Filters
