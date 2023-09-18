export const TRACE_ID = '__source';

export const NodeTypes = <const>{
  ELEMENT: 1,
};

export const ElementTypes = <const>{
  ELEMENT: 0,
  COMPONENT: 1,
};

export const TagTypes = <number[]>[
  ElementTypes.ELEMENT,
  ElementTypes.COMPONENT,
];
