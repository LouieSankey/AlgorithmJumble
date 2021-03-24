import React, { useState, useEffect, useContext } from 'react';
import './Jumble.css';
import MainContext from '../MainContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function Jumble() {

  const context = useContext(MainContext)
  
  //I did this here to avoid buggy behavior with keeping state for the Dropable interface
  useEffect(() => {
    context.updateSteps([...shuffleSteps(context.currentAlgorithm.steps)])
  }, [context.currentAlgorithm])

  function shuffleSteps(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


  const onDragEnd = (result) => {
    const steps = Array.from(context.steps);
    const [reorderedItem] = steps.splice(result.source.index, 1);
    steps.splice(result.destination.index, 0, reorderedItem);
    context.updateSteps(steps);
  } 


  return (
    <>
      <h2 className="drag-list-header" >Drag the steps of the algorithm into the correct order.</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="step">
          {(provided) => (
            <ul className="step" {...provided.droppableProps} ref={provided.innerRef}>
              {context.steps.map(({ id, item }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <p>
                          {item}
                        </p>
                        <div className={"circle " + (id == index ? " blue " : " red ") + context.correctOrderIndicator}></div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="next-check-buttons-row">
        <div className="next-check-buttons-column"><button className="submit-button" onClick={context.onCheckPressed}>CHECK</button></div>
        <div className="next-check-buttons-column"><button className="next-button" onClick={context.onNextPressed}>NEXT</button></div>
      </div>
    </>
  );

}

export default Jumble;
