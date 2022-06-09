import React from "react";
import Model, { StepState } from "./model";
import classnames from "classnames";
import uniqueId from "lodash.uniqueid";

const Arrows = ({
  model,
  className,
  numberStyle,
  numberClassName,
  labelStyle,
  labelClassName,
  ...rest
}) => {
  const renderStep = (step, index) => {
    const modifiersClasses = classnames(
      model.current === index && "Arrows--step__current",
      model.current > index && "Arrows--step__passed",
      model.current < index && "Arrows--step__coming",
      step.state === StepState.UNTOUCHED && "Arrows--step__untouched",
      step.state === StepState.SKIPPED && "Arrows--step__skipped",
      step.state === StepState.DONE && "Arrows--step__done",
      step.state === StepState.INVALID && "Arrows--step__invalid"
    );
    return (
      <div key={index} className={classnames("Arrows--step", modifiersClasses)}>
        <SvgArrow className="Arrows--step--arrow" />
        <div className="Arrows--step--content">
          <span
            style={numberStyle}
            className={classnames("Arrows--step--number", numberClassName)}
          >
            {step.title}
          </span>
          <span
            style={labelStyle}
            className={classnames("Arrows--step--label", labelClassName)}
          >
            {step.label}
          </span>
        </div>
      </div>
    );
  };

  if (!(model instanceof Model)) {
    model = new Model(model);
  }

  return (
    <div {...rest} className={classnames("Arrows", className)}>
      {model.steps.map(renderStep)}
    </div>
  );
};

const SvgArrow = ({ className }) => {
  const gradientId = uniqueId("SvgArrow");
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient x1="0" y1="0" x2="1" y2="0" id={gradientId}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <polygon
        points="0,0 95,0 100,50 95,100 0,100 5,50"
        fill={`url(#${gradientId})`}
        className={className}
      />
    </svg>
  );
};

export default Arrows;
