const nodeToArray = (
  node: NodeListOf<Element | ChildNode> | HTMLCollectionOf<Element>
): Element[] | ChildNode[] => {
  return Array.from(node);
};

export default nodeToArray;
