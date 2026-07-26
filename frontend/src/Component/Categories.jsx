import React from 'react'

function Categories() {

  return (
    <div>
    <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
            <option value="All">All</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Programming">Programming</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
        </select>
    </div>
  )
}

export default Categories
