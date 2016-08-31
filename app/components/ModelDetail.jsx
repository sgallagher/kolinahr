import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SaveButton from './SaveButton';
import Column from './Column';
import Title from './Title';
import Canvas from './Canvas';
import ErrorBanner from './ErrorBanner';
import EmptyBanner from './EmptyBanner';
import Notification from './Notification';
import { loadModel } from '../actions';

class ModelDetail extends React.Component {
  componentDidMount() {
    this.props.loadModel(this.props.routeParams.modelId);
  }

  render() {
    return (
      <div id="model-detail">
        <div className="title-area">
          <Title />
          <SaveButton />
        </div>
        <ErrorBanner />
        <EmptyBanner />
        <div id="column-container">
          <Column stateKey="inputs" name="Inputs" linkKey="activities" className="column" />
          <Canvas left="inputs" right="activities" />
          <Column stateKey="activities" name="Activities" linkKey="outputs" className="column" />
          <Canvas left="activities" right="outputs" />
          <Column stateKey="outputs" name="Outputs" linkKey="outcomes" className="column" />
          <Canvas left="outputs" right="outcomes" />
          <Column
            stateKey="outcomes" name="Outcomes" linkKey="impact" className="column column-dark"
          />
          <Canvas left="outcomes" right="impact" />
          <Column stateKey="impact" name="Impact" className="column column-dark" />
        </div>
      </div>
    );
  }
}

ModelDetail.propTypes = {
  loadModel: React.PropTypes.func.isRequired,
  routeParams: React.PropTypes.object.isRequired
};

export default compose(
  DragDropContext(HTML5Backend),
  connect(null, { loadModel })
)(ModelDetail);

