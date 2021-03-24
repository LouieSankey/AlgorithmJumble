import React, { useState, useEffect, useContext } from 'react';
import './Jumble.css';
import MainContext from '../MainContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function Jumble() {

  const mainContext = useContext(MainContext)
  
  //currentAlgorithm will initially come from STORE[algoIndex]
  //I did this here so that when the currentAlgorithm changes
  //the current steps will also change
  useEffect(() => {
    mainContext.updateSteps([...shuffleSteps(mainContext.currentAlgorithm.steps)])
  }, [mainContext.currentAlgorithm])

  function shuffleSteps(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}



  const onDragEnd = (result) => {
    const steps = Array.from(mainContext.steps);
    const [reorderedItem] = steps.splice(result.source.index, 1);
    steps.splice(result.destination.index, 0, reorderedItem);
    mainContext.updateSteps(steps);
  } 


  return (
    <>
      <h2 className="drag-list-header" >Drag the steps of the algorithm into the correct order.</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="step">
          {(provided) => (
            <ul className="step" {...provided.droppableProps} ref={provided.innerRef}>
              {mainContext.steps.map(({ id, item }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <p>
                          {item}
                        </p>
                        <div className={"circle " + (id == index ? " blue " : " red ") + mainContext.showHide}></div>
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
    </>
  );

}

export default Jumble;
