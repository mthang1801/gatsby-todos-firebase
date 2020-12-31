import React from "react";
import {
  CustomFormContainer,
  FormHeader, 
  FormGroups,
  FormActions,
  StyledLink,
  Option,
  FlashForm,
  Title,
  SubTitle,
  ErrorMessage
} from "../../UI/control/Form";
import Button from "../../UI/control/Button"
import CustomInput from "../../UI/control/custom-input/custom-input.component";
import ButtonLoginGoogle from "../../UI/control/ButtonLoginGoogle";
import ButtonLoginFacebook from "../../UI/control/ButtonLoginFacebook";
import Loader from "../../UI/structure/loader"
const INITIAL_STATE = {
  controls: {
    name: {
      type: "text",
      name: "name",
      valid: false,
      label: "Name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    email: {
      type: "email",
      name: "email",
      label: "Email",
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    password: {
      type: "password",
      name: "password",
      valid: false,
      label: "Password",
      validation: {
        required: true,
        minLength: 6,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    confirmPassword: {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      valid: false,
      validation: {
        required: true,
        minLength: 6,
        match: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
  },
  formIsValid: false,
  loaded : false ,
  disabled : true,
  error : undefined
};

class SignUp extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount(){
    this.setState({loaded : true})
  }

  checkValidity = (value, rules) => {   
    let isValid = true;
    let errorsMessage = [];
    if (rules.required) {
      isValid = value.trim().length && isValid;
      if (!isValid) {
        errorsMessage.push("This field is required");
      }
    }
    if (rules.isEmail) {
      const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
      if (!isValid) {
        errorsMessage.push("Email is invalid");
      }
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
      if (!isValid) {
        errorsMessage.push(`Invalid, at least ${rules.minLength} characters`);
      }
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
      if (!isValid) {
        errorsMessage.push(`Invalid, at most ${rules.maxLength} characters`);
      }
    }
    if (rules.match) {
      isValid = value.trim() === this.state.controls.password.value && isValid;
      if (!isValid) {
        errorsMessage.push("Password and confirm Password do not match");
      }
    }
    return errorsMessage;
  };

  handleChange = (e, name) => {
    let updatedControls = { ...this.state.controls };
    let updatedControlElement = { ...updatedControls[name] };
    updatedControlElement.value = e.target.value;
    const checkValid = this.checkValidity(
      e.target.value,
      updatedControlElement.validation
    );
    updatedControlElement.valid = checkValid.length === 0;
    updatedControlElement.touched = true;
    updatedControlElement.validationErrors = checkValid;
    updatedControls[name] = updatedControlElement;
    let { email, password, confirmPassword } = updatedControls;
    const formIsValid =
      email.valid &&
      updatedControlElement.valid &&
      password.valid &&
      confirmPassword.valid;
    this.setState({ controls: updatedControls, formIsValid });
  };

  handleSubmitSignUpForm = async (e) => {
    e.preventDefault();
    this.setState({loaded : false })
    this.setState({error : undefined})
    if (!this.state.formIsValid) {
      this.setState({ ...INITIAL_STATE });
      return;
    }
    const { name, email, password } = this.state.controls;   
    try{
      await this.props.signUp(email.value, password.value);
    }catch(err){
      if(err.code === "auth/email-already-in-use"){
        this.setState({error : "Tài khoản đã tồn tại."})
      }else{
        this.setState({error : "Có lỗi xảy ra."})
      }    
    }
    this.setState({loaded: true})
  };


  render() {
    const { formIsValid, loaded , disabled, error} = this.state;
    let formInputArray = [];
    Object.keys(this.state.controls).map((controlItem) => {
      formInputArray.push(this.state.controls[controlItem]);
    });   
    return (
      <CustomFormContainer onSubmit={this.handleSubmitSignUpForm}>
        {!loaded && <Loader/>}
        <FormHeader>
          <Title>Sign Up</Title>
          <SubTitle>
            Sign up your account via email and password.
          </SubTitle>
          <FlashForm>
            <ButtonLoginFacebook onClick={this.props.loginFacebook}/>
            <ButtonLoginGoogle onClick={this.props.loginGoogle}/>
          </FlashForm>
        </FormHeader>
        {error && <ErrorMessage>{error}</ErrorMessage>}      
        <FormGroups>
          {formInputArray.map(
            ({
              label,
              name,
              touched,
              type,
              valid,
              validation,
              validationErrors,
              value,
            }) => (
              <CustomInput
                key={name}
                type={type}
                name={name}
                value={value}
                label={label}
                onChange={(e) => this.handleChange(e, name)}
                require={validation.required}
                touched={touched}
                valid={valid}
                validationErrors={validationErrors}
              />
            )
          )}             
          <Button>Đăng ký</Button> 
        </FormGroups>      
        <FormActions>          
          <Option>Đã có tài khoản? <StyledLink onClick={() => this.props.setFormType("login")}>Đăng nhập</StyledLink></Option>
          {/* <Option>Forgot password ? <StyledLink to={`${authPath}/restore-account`}>Get Password Again.</StyledLink></Option> */}
        </FormActions>  
      </CustomFormContainer>
    );
  }
}


export default SignUp;
