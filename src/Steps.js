import React, { Component } from 'react';
import styled from 'styled-components';

const StepsContainer = styled.div`
  display: flex;
  margin: 100px;
`;

const Step = styled.div`
  width: 20px;
  height: 20px;
  border: 5px ${props => props.active ? '#562ad2' : '#dbdbdb'} solid;
  border-radius: 50%;
  margin-right: 200px;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 204px;
    height: 6px;
    background: ${props => props.active ? '#562ad2' : '#dbdbdb'};
    margin-top: 7px;
    float: right;
    margin-right: 21px;
  }

  &:first-child {
    &:before { display: none; }
  }

  &:hover {
    cursor: pointer;
  }
`;


const StepTitle =  styled.span`
  position: absolute;
  top: -30px;
  margin-left: -12px;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.active ? '#562ad2' : '#dbdbdb'}
`;



class Steps extends Component {
  constructor(props) {
    super(props);
    this.verifyMinAndMaxLenght();

    const activeSteps = this.props.steps.filter(step => step.active);

    this.state = {
      steps: this.props.steps,
      currentStep: activeSteps.length - 1
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentStep !== this.state.currentStep) {
      console.log('state has changed!');
    }
  }

  verifyMinAndMaxLenght() {
    const { steps } = this.props;
    const STEPS_LENGTH = steps.length;
    const MIN_LENGTH = 2;
    const MAX_LENGTH = 5;

    if(STEPS_LENGTH < MIN_LENGTH || STEPS_LENGTH > MAX_LENGTH) {
      throw new Error("Steps should have lenght between 2 and 5");
    }
  }

  changeStep(key) {
    const { currentStep } = this.state;
    const PREV_STEP = currentStep - 1;
    const NEXT_STEP = currentStep + 1;

    if(key === PREV_STEP || key === NEXT_STEP) {
      this.selectStep(key);
    }
  }

  selectStep(key) {
    const { steps } = this.state;

    const stepsOrganized = steps.map((step, stepKey) => {
      if(stepKey > key) {
        step.active = false;
      } else {
        step.active = true;
      }

      return step;
    });

    this.setState({
      steps: stepsOrganized,
      currentStep: key
    });
  }

  renderStep(step, key) {
    return (
      <Step key={key} active={step.active} onClick={() => this.changeStep(key)}>
        <StepTitle active={step.active}>
          { step.title }
        </StepTitle>
      </Step>
    );
  }

  render() {
    const { steps } = this.state;

    return (
      <StepsContainer>
        { steps.map((step, key) => this.renderStep(step, key)) }
      </StepsContainer>
    );
  }
}

export default Steps;
