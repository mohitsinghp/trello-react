import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addList, addCard, removeCard } from '../actions';

class TrelloActionButton extends Component {
    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true
        });
    }

    closeForm = (e) => {
        this.setState({
            formOpen: false
        });
    }

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;
        if (text) {
            this.setState({
                text: ""
            })
            dispatch(addList(text));
        }
        return;
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;
        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addCard(listID, text));
        }
        return;
    }

    handleRemoveCard = () => {
        const { dispatch, listID, cardID } = this.props;
        dispatch(removeCard(listID, cardID));

        return;
    }

    handleKeyPress = (e) => {
        const { list } = this.props;
        if(e.keyCode === 13 && list){
            this.handleAddList();
            document.activeElement.blur();
        }
    }

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Add another list" : "Add another card"
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div
                onClick={this.openForm}
                style={{
                    ...styles.openFormButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground,
                    margin: 6
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        );
    };

    renderForm = () => {
        const { list } = this.props;

        const placeholder = list
            ? "Enter list title..."
            : "Enter a title for this card...";
        const buttonTitle = list ? "Add List" : "Add Card";

        const styleTextArea = list
            ? {
                overflow: "visible",
                minHeight: 30,
                minWidth: 270,
                padding: "6px 8px 2px",
                margin: 5
            }
            : {
                overflow: "visible",
                minHeight: 60,
                minWidth: 270,
                padding: "6px 8px 2px"
            };

        return (
            <div>
                <Card style={styleTextArea}>
                    <Textarea
                        onKeyDown={this.handleKeyPress}
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none",
                            fontFamily: "Roboto",
                            fontSize: 16
                        }}
                    />
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button
                        onMouseDown={list ? this.handleAddList : this.handleAddCard}
                        variant="contained"
                        style={{
                            color: "#fff",
                            backgroundColor: "#5aac44"
                        }}>
                        {buttonTitle} {" "}
                    </Button>
                    {/* <Icon style={{
                        marginLeft: 8,
                        cursor: "pointer",
                    }}>close</Icon> */}
                </div>
            </div>
        );
    };

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    };
}

const styles = {
    openFormButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        margin: 5
    },
    openFormButtonGroupList: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    }
}

export default connect()(TrelloActionButton);