const nodeToArray = (node: NodeListOf<Element>): Element[] => {
  return Array.from(node);
};

export default nodeToArray;
