import React, { useState } from 'react';
import { Typeahead, TypeaheadInputMulti } from 'react-bootstrap-typeahead';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Token from './Token'; // Import the Token component

import options from './data'; // Import your data

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css';

const MultiSelectWithDragDrop = () => {
  const [selected, setSelected] = useState([]);

  const moveToken = (fromIndex, toIndex) => {
    const updatedSelected = [...selected];
    const [token] = updatedSelected.splice(fromIndex, 1);
    updatedSelected.splice(toIndex, 0, token);
    setSelected(updatedSelected);
  };

  const removeToken = (index) => {
    const updatedSelected = selected.filter((_, i) => i !== index);
    setSelected(updatedSelected);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Typeahead
        id="dnd-token-example"
        multiple
        onChange={setSelected}
        options={options}
        placeholder="Choose a state..."
        renderInput={(inputProps) => (
          <TypeaheadInputMulti {...inputProps}>
            {selected.map((option, idx) => (
              <Token
                key={option.label}
                option={option}
                index={idx}
                moveToken={moveToken}
                removeToken={removeToken}
              />
            ))}
          </TypeaheadInputMulti>
        )}
        selected={selected}
      />
    </DndProvider>
  );
};

export default MultiSelectWithDragDrop;
