import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const ToggleButton = ({ view, setView }) => {
  return (
    <ButtonGroup className="mb-3">
      <Button
        variant={view === 'week' ? 'primary' : 'outline-primary'}
        onClick={() => setView('week')}
      >
        Week
      </Button>
      <Button
        variant={view === 'month' ? 'primary' : 'outline-primary'}
        onClick={() => setView('month')}
      >
        Month
      </Button>
    </ButtonGroup>
  );
};

export default ToggleButton;
