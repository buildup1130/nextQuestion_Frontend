import IndexPageUI from "./indexPage.Presenter";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/AuthContext";
import { useState, useEffect } from "react";
import { createQuestion } from "@/utils/QuestionGenerator";

export default function IndexPageLogic() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();

  //회원일 경우 30문제, 비회원일 경우 5문제 출제
  const numArr = token ? [5, 10, 15, 20, 25, 30] : [5];

  //문제 생성 관련 State
  const [file, setFile] = useState(undefined);
  const [QuestionCount, setQuestionCount] = useState(5);
  const [isCreated, setIsCreated] = useState(false);
  const [questionArr, setQuestionArr] = useState(undefined);
  const [questionInfoArr, setQuestionInfoArr] = useState(undefined);

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickGenerate = () => {
    const response = createQuestion(file, QuestionCount, token);
  };

  //비회원일 경우 문제 생성 후 페이지 이동
  useEffect(() => {
    if (isCreated && !isAuthenticated && questionArr?.length > 0) {
      // 로컬 스토리지에 데이터 저장
      localStorage.setItem("tempQuestionData", JSON.stringify(questionArr));

      // Question 페이지로 이동
      router.push({
        pathname: "/Question",
        query: {
          type: 4,
        },
      });
    }
  }, [isCreated, isAuthenticated, questionArr, router]);

  return (
    <IndexPageUI
      onClickLogin={onClickLogin}
      user={user}
      isAuthenticated={isAuthenticated}
      isCreated={isCreated}
      setIsCreated={setIsCreated}
      questionArr={questionArr}
      questionInfoArr={questionInfoArr}
      file={file}
      setFile={setFile}
      numArr={numArr}
      QuestionCount={QuestionCount}
      setQuestionCount={setQuestionCount}
      onClickGenerate={onClickGenerate}
    ></IndexPageUI>
  );
}
