import React from 'react';

const Category = ({ category, setCategory }) => {
  const categories = [
    { label: "Any Category", value: "" },
    { label: "General Knowledge", value: 9 },
    { label: "Entertainment: Books", value: 10 },
    { label: "Entertainment: Film", value: 11 },
    { label: "Entertainment: Music", value: 12 },
    { label: "Entertainment: Musicals & Theatres", value: 13 },
    { label: "Entertainment: Television", value: 14 },
    { label: "Entertainment: Video Games", value: 15 },
    { label: "Entertainment: Board Games", value: 16 },
    { label: "Science & Nature", value: 17 },
    { label: "Science: Computers", value: 18 },
    { label: "Science: Mathematics", value: 19 },
    { label: "Mythology", value: 20 },
    { label: "Sports", value: 21 },
    { label: "Geography", value: 22 },
    { label: "History", value: 23 },
    { label: "Politics", value: 24 },
    { label: "Art", value: 25 },
    { label: "Celebrities", value: 26 },
    { label: "Animals", value: 27 },
    { label: "Vehicles", value: 28 },
    { label: "Entertainment: Comics", value: 29 },
    { label: "Science: Gadgets", value: 30 },
    { label: "Entertainment: Japanese Anime & Manga", value: 31 },
    { label: "Entertainment: Cartoon & Animations", value: 32 }
  ];

  return (
    <div>
      <label htmlFor="category">Category</label>
      <select 
        name="category" 
        id="category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;