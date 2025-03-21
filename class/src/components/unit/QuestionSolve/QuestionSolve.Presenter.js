import MainContainerLogic from "@/components/common/MainContainer/MainContainer.Container";
import { useState } from "react";
import {
  ButtonContainer,
  NextButton,
  OptionContainer,
  OptionItem,
  Progress,
  ProgressBar,
  ProgressText,
  QuestionBox,
  QuestionContainer,
  QuestionHeader,
  QuestionIcon,
  QuestionTitle,
  Header,
  BackButton,
  Title,
  Plus,
  QuestionBox__Header,
} from "./QuestionSolve.Styles";
import { useRouter } from "next/router";

export default function QuestionSolveUI(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const router = useRouter();

  // 문제 데이터가 없으면 로딩 또는 빈 상태 표시
  if (!props.questions || props.questions.length === 0) {
    return <MainContainerLogic>문제를 불러오는 중...</MainContainerLogic>;
  }

  const question = props.questions[currentQuestion];

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    if (question.answer == selectedAnswer) {
      setCorrectAnswer(correctAnswer + 1);
    }

    if (currentQuestion < props.questions.length - 1) {
      console.log(`${question.answer} = ${selectedAnswer}`);
      console.log(`${question.answer == selectedAnswer}`);

      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  // 옵션 선택 처리
  const handleSelectOption = (index) => {
    setSelectedAnswer(index);
  };

  // 선택지 배열로 변환 (MULTIPLE_CHOICE 타입)
  const options =
    question.type === "MULTIPLE_CHOICE" && question.opt
      ? question.opt.split("/")
      : [];

  // 문제 풀이 완료시 표현되는 화면
  if (isCompleted) {
    return (
      <MainContainerLogic>
        <Header>
          <BackButton>←</BackButton>
          <Title>책장</Title>
        </Header>
        <div
          style={{
            width: "100%",
            marginTop: "40%",
            padding: "0 16px",
            maxWidth: "500px",
          }}
        >
          <Title style={{ marginBottom: "20px" }}>풀이 결과</Title>
          <ProgressBar style={{ height: "28px", borderRadius: "16px" }}>
            <Progress current={correctAnswer} total={props.questions.length} />
          </ProgressBar>

          <ProgressText style={{ fontSize: "20px" }}>
            {correctAnswer}/{props.questions.length}
          </ProgressText>
        </div>
        <NextButton
          onClick={() => {
            router.push("/");
          }}
        >
          홈으로
        </NextButton>
      </MainContainerLogic>
    );
  }

  //문제 화면
  return (
    <MainContainerLogic>
      <Header>
        <BackButton>←</BackButton>
        <Title>책장</Title>
      </Header>
      <QuestionContainer>
        {/* 진행 상태 바 */}
        <ProgressBar>
          <Progress
            current={currentQuestion + 1}
            total={props.questions.length}
          />
        </ProgressBar>

        <ProgressText>
          {currentQuestion + 1}/{props.questions.length}
        </ProgressText>

        {/* 문제 헤더 */}
        <QuestionHeader>
          • 문제집 이름 {currentQuestion + 1} • n번 오답
        </QuestionHeader>

        {/* 문제 카드 */}
        <QuestionBox>
          <QuestionBox__Header>
            <QuestionIcon>?</QuestionIcon>
            {/*문제 제목 */}
            <QuestionTitle>{question.name}</QuestionTitle>
          </QuestionBox__Header>
          {/* 선택지 영역 */}
          <OptionContainer>
            {/* 오지선다 */}
            {question.type === "MULTIPLE_CHOICE" &&
              options.map((option, index) => (
                <OptionItem
                  key={index}
                  selected={selectedAnswer === index + 1}
                  onClick={() => handleSelectOption(index + 1)}
                >
                  {index + 1}. {option.split(". ")[1] || option}
                </OptionItem>
              ))}
            {/* O X */}
            {question.type === "OX" && (
              <>
                <OptionItem
                  selected={selectedAnswer === 0}
                  onClick={() => handleSelectOption("O")}
                >
                  1. O
                </OptionItem>
                <OptionItem
                  selected={selectedAnswer === 1}
                  onClick={() => handleSelectOption("X")}
                >
                  2. X
                </OptionItem>
              </>
            )}

            {/* 빈 칸형 문제 */}
            {question.type === "FILL_IN_THE_BLANK" && (
              <input
                type="text"
                placeholder="답을 입력하세요"
                style={{
                  padding: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
                onChange={(e) => {
                  setSelectedAnswer(e.target.value);
                }}
              />
            )}
          </OptionContainer>
        </QuestionBox>

        {/* 다음 버튼 */}
        <ButtonContainer>
          <NextButton onClick={handleNextQuestion}>Next Question</NextButton>
        </ButtonContainer>
      </QuestionContainer>
    </MainContainerLogic>
  );
}

const MultipleChoiceContainer = () => {};
