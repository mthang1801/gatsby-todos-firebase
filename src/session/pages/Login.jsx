import React from "react"
import {
  CustomFormContainer,
  FormHeader,
  Title,
  SubTitle,
  FormGroups,
  FormActions,
  StyledLink,
  Option,
  FlashForm,
  ErrorMessage,
} from "../../UI/control/Form"
import CustomInput from "../../UI/control/custom-input/custom-input.component"
import Button from "../../UI/control/Button"
import ButtonLoginFacebook from "../../UI/control/ButtonLoginFacebook"
import ButtonLoginGoogle from "../../UI/control/ButtonLoginGoogle"
import Loader from "../../UI/structure/loader"
class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.signInRef = React.createRef()
  }
  state = {
    email: "",
    password: "",
    error: null,
    disabled: true,
    loading: true,
    captcha_value: null,
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ error: this.props.error })
    }
  }
  componentDidMount(){
    this.setState({loading : false})
  }

  onSubmitSigninForm = async e => {
    e.preventDefault()
    this.setState({loading : true })
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({ error: "Email và mật khẩu không được để trống" })
      return
    }
    this.setState({ error: null })
    try {
      await this.props.signIn(email, password)
    } catch (error) {      
      if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found"){
        this.setState({ error: "Tài khoản hoặc mật khẩu không đúng" })
      }else{
        this.setState({ error: "Có lỗi xảy ra" })
      }      
    }
    this.setState({loading: false})
  }
  handleChangeGoogleRecaptcha = value => {
    this.setState({ captcha_value: value, disabled: false })
    if (value === null) this.setState({ disabled: true })
  }

  render() {
    const { email, password, error, loading } = this.state   
    return (      
      <CustomFormContainer
        onSubmit={this.onSubmitSigninForm}
        ref={this.signInRef}
      >
        {loading && <Loader/>}
        <FormHeader>
          <Title>Đăng nhập</Title>
          <SubTitle>Đăng nhập tài khoản bằng email và mật khẩu</SubTitle>
        </FormHeader>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FlashForm>
          <ButtonLoginFacebook onClick={this.props.loginFacebook} />
          <ButtonLoginGoogle onClick={this.props.loginGoogle} />
        </FlashForm>
        <FormGroups>
          <CustomInput
            type="text"
            name="email"
            value={email}
            label="Email"
            onChange={this.handleChange}
            required
          />
          <CustomInput
            type="password"
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
            required
          />
          <Button>Đăng nhập</Button>
        </FormGroups>
        <FormActions>
          <Option>
            Bạn chưa có tài khoản?{" "}
            <StyledLink onClick={() => this.props.setFormType("signup")}>
              Đăng ký ngay
            </StyledLink>
          </Option>
          {/* <Option>Forgot password ? <StyledLink to={`${authPath}/restore-account`}>Get Password Again.</StyledLink></Option> */}
        </FormActions>
      </CustomFormContainer>
    )
  }
}

export default SignIn
