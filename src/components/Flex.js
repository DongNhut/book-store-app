const Flex = (props) => {
  const {
    direction = "row",
    align = "center",
    justify = "center",
    wrap = "wrap",
    gap,
    style,
    children,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
