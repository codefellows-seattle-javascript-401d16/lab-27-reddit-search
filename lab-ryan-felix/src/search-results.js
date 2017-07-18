import React from 'react';

const SearchResults = (props) => {
  if(props.results && props.results.length > 0) {
    return (
      <ul>
        {props.results.map((result, idx) => (
          <li key={idx}>
            <a
              href={result.url}
            >
              <h4>{result.title}</h4>
              <p>{result.ups}</p>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>No results yet.</p>
  );

}

export default SearchResults;
