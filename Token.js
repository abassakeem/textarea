import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from 'react-bootstrap';
import {CiCircleRemove} from "react-icons/ci"
import "./styles.css"

const TOKEN_TYPE = 'TOKEN';

const Token = ({ option, index, moveToken, removeToken }) => {
  const [{ isDragging }, drag] = useDrag({
    type: TOKEN_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: TOKEN_TYPE,
    hover: (dragged) => {
      if (dragged.index !== index) {
        moveToken(dragged.index, index);
        dragged.index = index;
      }
    },
  });

  return (
    <div className='options' ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {option.label}
      <Button className='cancel-button ' onClick={() => removeToken(index)}><CiCircleRemove className='m-1 m-2' /></Button>
    </div>
  );
};

export default Token;
