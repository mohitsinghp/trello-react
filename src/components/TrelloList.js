import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import Icon from '@material-ui/core/Icon'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {removeList } from '../actions';

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 280px;
    padding: 5px;
    height: 100%;
    margin: 5px;
`;

const TrelloList = (props) => {
    const { title, cards, listID, index } = props;
    const handleRemoveList = () => {
        props.dispatch(removeList(listID));
        return;
    }

    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <ListContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <Droppable droppableId={String(listID)}>
                        {(provided) => (
                            <div  {...provided.droppableProps} ref={provided.innerRef}>
                                <h4
                                    style={{
                                        margin: 10,
                                        display: "flex",
                                        justifyContent:"space-between",
                                        alignItems: "center"
                                        }}>
                                    {title}
                                    <Icon className="icon" onClick={handleRemoveList} >close</Icon></h4>
                                    
                                {cards.map((card, index) => (
                                    <TrelloCard
                                        listID={listID}
                                        key={card.id}
                                        index={index}
                                        text={card.text}
                                        id={card.id}
                                    />
                                ))}
                                {provided.placeholder}
                                <TrelloActionButton listID={listID} />
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    );
};

export default connect()(TrelloList);