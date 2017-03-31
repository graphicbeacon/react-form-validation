const If = function(props) {
    return props.condition ? props.children : null;
}

export default If;