import React from 'react';
import Str from '../Util/Str';

import './TextSelection.scss';

type TextSelectionProps = {
  text: React.ReactNode,
  selectionText?: string,
};

// Renders styled span for each match of selectionText in target text string.
// Example: <TextSelection text="aabbaacc" selectionText="aa"/> will transform to:
// <span>aa</span>bb<span>aa</span>cc
const TextSelection = (props: TextSelectionProps) => {
  if(typeof props.selectionText == 'undefined')
    return <>{props.text}</>;

  let selectionText = props.selectionText;
  let textJsx: Array<React.ReactNode> = [];
  let caseSensitive = false;
  let parts = Str.splitByMatches(selectionText, props.text as string, caseSensitive);
  parts.map((part, i) => {
    let isSelection = (part == selectionText);
    if(!caseSensitive)
      isSelection = (part.toLowerCase() == selectionText.toLowerCase());
    if(isSelection)
      textJsx.push(
        <span className='autocomplete__selectionText' key={i}>
          {part}
        </span>
    );
    else
      textJsx.push(part);
  });

  return <>{
    textJsx.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)
  }</>;
};

export default TextSelection;