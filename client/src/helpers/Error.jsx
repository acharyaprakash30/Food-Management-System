const Error = ({ children, ...props }) => {
    console.log(props);
    console.log(children);
    return (
        <>
            {/* <div className="z-50 b fixed"
            style={{ color: "#f23838", textAlign: "center", margin: "0.5rem 0" }}
            {...props}
        >
            {children}
        </div> */}
        </>

    );
};

export default Error;