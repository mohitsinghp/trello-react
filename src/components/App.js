import React from 'react';
import Nav from './Nav';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, getTrelloList } from '../actions';
import styled from 'styled-components';

const ListContainer = styled.div`
    display: flex;
`;

class App extends React.Component {
    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        this.props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    };

    componentDidMount() {
        this.props.dispatch(
            getTrelloList
        );
    }

    render() {
        console.log(this.props.id);
        const lists = this.props.lists;
        return (
            <div className="App">
                <Nav />
                <DragDropContext onDragEnd={this.onDragEnd} >
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {provided => (
                            <ListContainer {...provided.droppableProps} ref={provided.innerRef} >
                                {lists.map((list, index) => (
                                    <TrelloList
                                        listID={list.id}
                                        key={list.id}
                                        title={list.title}
                                        cards={list.cards}
                                        index={index} />
                                ))}
                                {provided.placeholder}
                                <TrelloActionButton list />
                            </ListContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.data);
    return {
        lists: state.data.list,
        id: state.data.id
    }
};

export default connect(mapStateToProps)(App);