import React from 'react';
import './TrelloCard.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeCard } from '../actions';

const CardContainer = styled.div`
    margin-bottom: 8px;
`;

const TrelloCard = (props) => {
    const { text, id, index, listID } = props;
    const handlerRemoveCard = () => {
        props.dispatch(removeCard(listID, id));
        return;
    }

    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <CardContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card className="card">
                        <CardContent style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Typography className="card-text" color="textSecondary" gutterBottom>{text}</Typography>
                            <Icon className="icon" onClick={handlerRemoveCard}
                            >close</Icon>
                        </CardContent>
                    </Card>
                </CardContainer>
            )}
        </Draggable>
    )
};

export default connect()(TrelloCard);