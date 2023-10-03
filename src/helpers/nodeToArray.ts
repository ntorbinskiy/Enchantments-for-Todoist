const nodeToArray = (
  node: NodeListOf<HTMLElement | ChildNode> | HTMLCollectionOf<Element>
): HTMLElement[] | ChildNode[] => {
  return Array.from(node);
};

export default nodeToArray;
