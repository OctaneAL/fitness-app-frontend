// SetCard.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SetCard = ({ set }) => (
  <ListGroup.Item>
    <strong>Підхід {set.number}</strong>: {set.repeats} повторів, {set.weight} кг
  </ListGroup.Item>
);

export default SetCard;
