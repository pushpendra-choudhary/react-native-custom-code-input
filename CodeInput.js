import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { TextInput, View, Text, StyleSheet } from "react-native";

class CodeInput extends Component {
  constructor(props) {
    super(props);

    const codeLength = props.number || props.code.length;

    this.state = {
      number: codeLength,
      code: new Array(codeLength).fill(""),
      edit: null,
      reset: false
    };

    this.textInputsRefs = [];

    this.clean = this.clean.bind(this);
    this.focus = this.focus.bind(this);
    this.isFocus = this.isFocus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const codeLength = newProps.number || newProps.code.length;

    if (newProps.number !== this.props.number) {
      this.setState({
        number: codeLength,
        edit: null
      });
    }
  }

  clean() {
    this.setState(prevState => {
      return {
        code: new Array(prevState.number).fill(""),
        edit: null,
        reset: true
      };
    });
    this.focus(0);
  }

  focus(id) {
    // Check to ensure that input exists. This is important in the case of autofill.
    if (this.textInputsRefs[id]) this.textInputsRefs[id].focus();
  }

  isFocus(id) {
    let newCode = this.state.code.slice();

    for (let i = 0; i < newCode.length; i++) if (i >= id) newCode[i] = "";

    this.setState({
      code: newCode,
      edit: id
    });
  }

  handleEdit(number, id) {
    let newCode = this.state.code.slice();

    console.log("number id", number, id);
    console.log("newcode", newCode);

    // Detecting if the entire code has been pasted or autofilled into
    // the first field.
    const hasAutofilled =
      number.length > 1 && number.length === this.props.number && id === 0;

    if (hasAutofilled) {
      newCode = number.split("");

      // Need to update state so UI updates.
      this.setState({
        code: newCode,
        edit: this.props.number - 1,
        reset: false
      });
    } else {
      newCode[id] = number[0];
    }

    // User filling the last pin ?
    if (id === this.state.number - 1 || hasAutofilled) {
      this.focus(0);

      this.props.onInputComplete(newCode.join(""));
      this.setState(prevState => ({
        code: newCode,
        edit: prevState.edit + 1,
        reset: true
      }));

      return;
    }

    this.focus(this.state.edit + 1);

    this.setState(prevState => {
      return {
        code: newCode,
        edit: prevState.edit + 1,
        reset: false
      };
    });
  }

  onKeyPress(e) {
    if (e.nativeEvent.key === "Backspace") {
      const edit = this.state.edit;
      const toFocus = edit > 0 ? edit - 1 : 0;
      this.focus(toFocus);
    }
  }

  render() {
    const { obfuscation, ...props } = this.props;

    let pins = [];
    for (let index = 0; index < this.state.number; index++) {
      const id = index;
      const value = this.state.code[id]
        ? obfuscation
          ? "*"
          : this.state.code[id].toString()
        : "";
      pins.push(
        <TextInput
          key={id + value + this.state.reset} // force to re-render on update
          ref={ref => (this.textInputsRefs[id] = ref)}
          keyboardType="numeric"
          onChangeText={text => this.handleEdit(text, id)}
          onFocus={() => this.isFocus(id)}
          value={value}
          maxLength={id === 0 ? this.props.number : 1}
          underlineColorAndroid="transparent"
          style={[styles.item, this.props.item]}
          autoCapitalize={"sentences"}
          autoCorrect={false}
          autoFocus={
            (id === 0 &&
              this.state.edit === null &&
              this.props.autoFocusFirst) ||
            id === this.state.edit
          }
          onKeyPress={this.onKeyPress}
          {...props}
        />
      );
    }

    return <View style={[styles.container, this.props.container]}>{pins}</View>;
  }
}

CodeInput.propTypes = {
  code: PropTypes.string,
  number: PropTypes.number,
  autoFocusFirst: PropTypes.bool,
  obfuscation: PropTypes.bool
};

CodeInput.defaultProps = {
  code: "",
  number: 6,
  autoFocusFirst: true,
  obfuscation: false
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  item: {
    fontSize: 22,
    width: 24,
    paddingLeft: 8,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000"
  }
});

export default CodeInput;
