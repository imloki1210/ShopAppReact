import { FaAngleUp, FaAngleDown  } from "react-icons/fa";
import React, { useState } from 'react';

const FiltersSidebar = ({ filters, onFilterChange }) => {
  const [expanded, setExpanded] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleAccordionToggle = (title) => {
    setExpanded(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => {
      let newFilters = { ...prev };
      if (newFilters[category]?.includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...(newFilters[category] || []), value];
      }
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="h-full w-full bg-white border-gray-200">
      <h2 className="font-semibold text-lg mb-5">Filters</h2>
      {filters.map((filter, index) => (
        <div key={index} className="mb-4">
          <span
            className="font-medium text-gray-800 cursor-pointer d-flex align-items-center "
            onClick={() => handleAccordionToggle(filter.title)}
          >
            {filter.title}
            {
              expanded[filter.title] ?
              <FaAngleUp className="ml-4"/>
              :
              <FaAngleDown className="ml-4"/>
            }
          </span>
          {expanded[filter.title] && (
            <div className="mt-2">
              {filter.options.map((option, idx) => (
                <div key={idx} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id={`${filter.title}-${option.value}`}
                    value={option.value}
                    checked={(selectedFilters[filter.title] || []).includes(
                      option.value
                    )}
                    onChange={() =>
                      handleCheckboxChange(filter.title, option.value)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${filter.title}-${option.value}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FiltersSidebar;
