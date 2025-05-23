import { useRouter } from "next/router";
import QuestionSolveUI from "./QuestionSolve.Presenter";
import { useState, useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import { loadDailyQuestion, loadNormalQuestion } from "@/utils/WorkbookManager";
import { toast } from "react-toastify";

export default function QuestionSolveLogic(props) {
  const [questions, setQuestions] = useState([]);
  const [workBookId, setWorkBookId] = useState("");
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();

  const { Id, count, random, ox, multiple, blank, type, title } = router.query;

  useEffect(() => {
    if(Id){
      setWorkBookId(Id);
      console.log(workBookId)
    }
  },[Id])

  useEffect(() => {
    console.log("✅ router.query:", router.query.title);

    // 비회원 학습: localStorage 기반
    if (type === "3") {
      const storedData = localStorage.getItem("tempQuestionData");
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          const handledData = handleQuestions(parsed);
          // 중복되지 않는 workBookId 수집하기
          const uniqueWorkbookIds = [...new Set(handledData.map(q => q.encryptedWorkbookId))];
          setWorkBookId(uniqueWorkbookIds.join(","));
          if (Array.isArray(handledData) && handledData.length > 0) {
            setQuestions(handledData);
            console.log("✅ 로컬 문제 데이터 로딩 완료:", handledData);
          } else {
            alert("문제 데이터가 비어있습니다.");
            router.push("/");
          }
        } catch (err) {
          console.error("로컬 문제 데이터 파싱 실패:", err);
          alert("문제 데이터를 불러오지 못했습니다.");
          router.push("/");
        }
      } else {
        alert("저장된 문제 데이터가 없습니다.");
        router.push("/");
      }
      return;
    }

    // 로그인 사용자
    if (isAuthenticated) {
      if (Id) {
        loadNormalQuestion(token, Id, {
          count: count || 5,
          random: random === "true" ? true : false,
          ox: ox === "true" ? true : false,
          multiple: multiple === "true" ? true : false,
          blank: blank === "true" ? true : false,
        }).then((result) => {
          if (result) {
            // Title 정보를 포함한 후처리
            const idToTitleMap = parseIdsAndTitles(Id, title);
            const processed = handleQuestions(result).map(question => {
              if (question.encryptedWorkbookId && idToTitleMap[question.encryptedWorkbookId]) {
                return { ...question, workBookTitle: idToTitleMap[question.encryptedWorkbookId] };
              }
              return question;
            });
            // console.log(processed);
            setQuestions(processed);
          } else {
            alert("잘못된 워크북 아이디입니다.");
            router.push("/");
          }
        });
      } else if (type === "2") {
        loadDailyQuestion(token).then((result) => {
          if (result) {
            const processed = handleQuestions(result);
            setQuestions(processed);
          } else {
            alert("워크북이 없습니다.");
            router.push("/");
          }
        });
      } else {
        // alert("로그인 정보가 없습니다.");
        router.push("/");
      }
    }
    // 3. 예외처리
    else {
      router.push("/");
    }
  }, [Id, token, count, random, ox, multiple, blank, type]);

  // //LocalStorage사용 방식
  // useEffect(() => {
  //     const storedData = localStorage.getItem('tempQuestionData');
  //     if (storedData && storedData!== undefined) {
  //       const questionData = JSON.parse(storedData);
  //       setQuestions(questionData); // 질문 데이터 설정
  //       setCount(questionData.length);// 문제 개수 설정

  //       console.dir(questionData);
  //        // 사용 후 삭제
  //     //   localStorage.removeItem('tempQuestionData');

  //     }
  //     const tmpTest = localStorage.getItem('isTest');
  //     if(tmpTest && tmpTest !== undefined){
  //         setIsTest(JSON.parse(tmpTest));
  //     }
  //     const tmpWorkBookId = localStorage.getItem('workBookId');
  //     if(tmpWorkBookId && tmpWorkBookId!== undefined){
  //         setWorkBookId(tmpWorkBookId);
  //     }

  //   }, []);

  // ❗ 여기서 리턴! 함수 안에서 JSX 반환
  return (
    <QuestionSolveUI
      questions={questions}
      type={Number(type)}
      workBookId={workBookId}
    />
  );
}

// 후처리: OX형 정답 문자열 → 숫자로, 빈칸 치환
function handleQuestions(questions) {
  if (!questions || !Array.isArray(questions)) {
    console.error("Questions data is not valid:", questions);
    return [];
  }

  return questions.map((data) => {
    const newData = { ...data };

    if (newData.answer === "O") newData.answer = "0";
    else if (newData.answer === "X") newData.answer = "1";

    if (newData.type === "FILL_IN_THE_BLANK") {
      newData.name = newData.name.replace("{BLANK}", "OOO");
    }
    return newData;
  });
}

// 외부로 분리된 유틸리티 함수
function parseIdsAndTitles(idString, titleString) {
  const ids = idString ? idString.split(',') : [];
  const titles = titleString ? titleString.split(',') : [];
  
  // ID와 Title의 매핑 객체 생성
  const idToTitleMap = {};
  ids.forEach((id, index) => {
    if (titles[index]) {
      idToTitleMap[id] = titles[index];
    }
  });
  
  // console.log(idToTitleMap)
  return idToTitleMap;
}

