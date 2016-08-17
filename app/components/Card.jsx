import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
import EditCardModal from './EditCardModal';

export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.setModal = this.setModal.bind(this);
    this.setCardElement = this.setCardElement.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.props.registerOffset(this.props.card.id, {
      top: this.cardElement.offsetTop,
      left: this.cardElement.offsetLeft,
      width: this.cardElement.offsetWidth,
      height: this.cardElement.offsetHeight
    });
  }

  componentDidUpdate() {
    this.props.registerOffset(this.props.card.id, {
      top: this.cardElement.offsetTop,
      left: this.cardElement.offsetLeft,
      width: this.cardElement.offsetWidth,
      height: this.cardElement.offsetHeight
    });
  }
  setCardElement(element) {
    this.cardElement = element;
  }

  setModal(modal) {
    this.modal = modal;
  }

  showModal() {
    this.modal.showModal();
  }

  renderCard() {
    return this.props.connectDragSource(
      <div
        ref={this.setCardElement}
        onClick={this.showModal}
        className="card"
        style={{ backgroundColor: this.props.card.color }}
      >
        {this.props.card.text}
      </div>
    );
  }

  render() {
    return this.props.connectDropTarget(
      <div className="card-wrapper">
        {this.renderCard()}
        <EditCardModal
          updateCard={this.props.updateCard}
          deleteCard={this.props.deleteCard}
          ref={this.setModal}
          card={this.props.card}
        />
      </div>
    );
  }
}

Card.propTypes = {
  card: React.PropTypes.object.isRequired,
  updateCard: React.PropTypes.func.isRequired,
  deleteCard: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  registerOffset: React.PropTypes.func.isRequired
};

const cardSource = {
  beginDrag(props) {
    const { card } = props;
    return {
      id: card.id,
      column: card.column,
      text: card.text
    };
  }
};

const cardTarget = {
  hover(targetProps, monitor) {
    const source = monitor.getItem();
    const { card } = targetProps;

    if (source.id !== card.id) {
      targetProps.moveCard(source.column, source.id, card.column, card.id);
      source.column = card.column;
    }
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

/* eslint-disable new-cap */
export default _.flow(
  DragSource('card', cardSource, dragCollect),
  DropTarget('card', cardTarget, dropCollect),
  reduxConnect(undefined, actions)
)(Card);

