import {
  SignUpContainer,
  InputWrapper,
  InputField,
  Label,
  EmailWrapper,
  IdInputWrapper,
  SignUpButton,
  FillForm,
  ErrorMessageWrapper, // 추가된 스타일
  ErrorMessage,
} from "./SignUp.Styles";

export default function SignUpUI({
  form,
  onChange,
  onSubmit,
  onSignUpClick,
  error,
}) {
  return (
    <SignUpContainer>
      <FillForm onSubmit={onSubmit}>
        <InputWrapper>
          <Label>아이디</Label>
          <IdInputWrapper>
            <InputField
              type="text"
              name="userId"
              value={form.userId}
              onChange={onChange}
              required
            />
          </IdInputWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>이메일</Label>
          <EmailWrapper>
            <InputField
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </EmailWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>비밀번호</Label>
          <InputField
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <InputField
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label>닉네임</Label>
          <InputField
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={onChange}
            required
          />
        </InputWrapper>

        {/* 에러 메시지를 항상 같은 위치에 유지 */}
        <ErrorMessageWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ErrorMessageWrapper>

        <SignUpButton type="submit">회원가입</SignUpButton>
        <SignUpButton type="button" onClick={onSignUpClick}>
          로그인 페이지로 이동
        </SignUpButton>
      </FillForm>
    </SignUpContainer>
  );
}
