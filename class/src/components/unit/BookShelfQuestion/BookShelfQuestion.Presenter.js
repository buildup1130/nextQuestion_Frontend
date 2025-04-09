
import {
  BookShelfQuestion__Container,
  BookShelfQuestion__CountContainer,
  BookShelfQuestion__Input,
  BookShelfQuestion__isTestButton,
  BookShelfQuestion__Modal,
  BookShelfQuestion__submitButton,
  BookShelfQuestion__SubTitle,
  BookShelfQuestion__Title,
  BookShelfQuestion__Wrapper,
  CurrentValue,
  Marker,
  Progress,
  ProgressBarContainer,
  ProgressWrapper,
  ValuesContainer,
  BookShelfQuestion__CloseButtonContainer,
  BookShelfQuestion__CloseButton,
} from "./BookShelfQuestion.Styles";


export default function BookShelfQuestionUI(props) {
  return (
    <BookShelfQuestion__Wrapper>
      <BookShelfQuestion__Container>
        <BookShelfQuestion__Modal>
          <BookShelfQuestion__CloseButtonContainer>
            <BookShelfQuestion__CloseButton onClick={props.onClose}>
              ❌
            </BookShelfQuestion__CloseButton>
          </BookShelfQuestion__CloseButtonContainer>

          <BookShelfQuestion__Title>
            문제 풀이 옵션 선택
          </BookShelfQuestion__Title>
          <BookShelfQuestion__SubTitle>문제 수(개)</BookShelfQuestion__SubTitle>


    return(<BookShelfQuestion__Wrapper>
        <BookShelfQuestion__Container>
            <BookShelfQuestion__Modal>
                <BookShelfQuestion__Title>
                    문제 풀이 옵션 선택
                </BookShelfQuestion__Title>
                <BookShelfQuestion__SubTitle>
                    문제 수(개)
                </BookShelfQuestion__SubTitle>
                <ProgressBar value={props.count} max={props.curBook.items}></ProgressBar>
                <BookShelfQuestion__CountContainer>
              <BookShelfQuestion__Input
                type="number"
                min = "1"
                max = {props.curBook.items}
                value={props.count}
                onChange={props.handleChange}
              ></BookShelfQuestion__Input>
              문제
            </BookShelfQuestion__CountContainer>
            <BookShelfQuestion__CountContainer>
            <div>모의고사 모드</div>
              <BookShelfQuestion__isTestButton
                type = "checkbox"
                onClick={() => {
                  props.isTest?props.setIsTest(false):props.setIsTest(true);
                }}
                isTest = {props.isTest}
              >
              </BookShelfQuestion__isTestButton>
            </BookShelfQuestion__CountContainer>
            <BookShelfQuestion__submitButton
              onClick={() => {props.onClickLearning()}}
            >
              학습하기
            </BookShelfQuestion__submitButton>
            </BookShelfQuestion__Modal>
        </BookShelfQuestion__Container>
    </BookShelfQuestion__Wrapper>);
}

const ProgressBar = ({ value, max }) => {
  return (
    <div style={{ width: "100%" }}>
      <ProgressWrapper>
        <CurrentValue value={value} max={max}>
          {value}
        </CurrentValue>
        <ProgressBarContainer>
          <Progress value={value} max={max} />
        </ProgressBarContainer>
        <ValuesContainer>
          <span>0</span>
          <span>{max}</span>
        </ValuesContainer>
      </ProgressWrapper>
    </div>
  );
};
