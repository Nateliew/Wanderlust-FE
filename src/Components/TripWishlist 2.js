import React, {useState} from "react";
import { Link, Outlet } from "react-router-dom";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const dummyData = [{
  id: '1',
  place: 'Nara Park'  
},
{
  id: '2',
  place: 'Osaka'  
},
{
  id: '3',
  place: 'Kyoto'  
},
{
  id: '4',
  place: 'Shin-Osaka'  
},
]
export default function TripWishlist() {
    // axios.defaults.baseURL = ''

// const [backendData, setBackendData] = useState(dummyData)
const [characters, updateCharacters] = useState(dummyData);


  // const fetchData =() => {
  //   fetch('http://localhost:3000/trips/1/wishlist').then((res)=> console.log(res.json())).catch((err)=>console.log(err))
  // }

  // useEffect(() => {
  //   fetchData()
  // },[])
    function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
    <div>
      <p>Wishlist</p>
       <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, place, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index} ondragover={(e)=>e.preventDefault()}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {/* <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div> */}
                          <p>
                            { place }
                          </p>
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
    </div>
  );
}
