import { useState, useEffect } from "react";
import { getWrongNote } from "@/utils/WrongNoteManager";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/router";
import WrongNoteUI from "./WrongNote.Presenter";

export default function WrongNoteLogic() {
  const today = new Date();
  today.setHours(today.getHours() + 9);
  const todayStr = today.toISOString().split("T")[0];

  const { token } = useAuth();
  const router = useRouter();

  const [selectedDateRange, setSelectedDateRange] = useState({
    start: todayStr,
    end: todayStr,
  });
  const [wrongNoteData, setWrongNoteData] = useState([]);
  const [workbookMap, setWorkbookMap] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [tempStart, setTempStart] = useState(todayStr);
  const [tempEnd, setTempEnd] = useState(todayStr);
  const [curBook, setCurBook] = useState(null);
  const [sequence, setSequence] = useState(0);
  const [count, setCount] = useState(1);
  const [isTest, setIsTest] = useState(false);

  useEffect(() => {
    if (token) fetchWrongNotes();
  }, [token, selectedDateRange]);

  const fetchWrongNotes = async () => {
    try {
      const result = await getWrongNote(
        token,
        selectedDateRange.start,
        selectedDateRange.end
      );
      if (!result || !result.questions) return;

      const grouped = {};
      result.questions.forEach((q, idx) => {
        const date = new Date(q.solvedDate);
        date.setHours(date.getHours() + 9);
        const dateStr = date.toISOString().split("T")[0];

        const title = q.workBookName?.trim() || "미지정 문제집";
        const id = q.encryptedWorkBookId;

        if (!grouped[title]) grouped[title] = { id, dates: {} };
        if (!grouped[title].dates[dateStr]) grouped[title].dates[dateStr] = [];

        grouped[title].dates[dateStr].push({
          id: idx,
          type:
            q.type === "MULTIPLE_CHOICE"
              ? "객관식"
              : ["OX", "TRUE_FALSE"].includes(q.type)
              ? "O/X"
              : "빈칸",
          title: q.name,
          fullText: q.name,
          options: q.opt ? q.opt.split("/") : [],
          answer: ["OX", "TRUE_FALSE"].includes(q.type)
            ? q.answer === "O"
              ? "O"
              : "X"
            : q.answer,
        });
      });

      const map = {};
      const formatted = Object.entries(grouped).map(
        ([workbook, { id, dates }]) => {
          map[workbook] = id;
          return {
            workbook,
            workbookId: id,
            dates: Object.entries(dates).map(([date, questions]) => ({
              date,
              questions,
            })),
          };
        }
      );

      setWorkbookMap(map);
      setWrongNoteData(formatted);
    } catch (err) {
      console.error("오답노트 에러:", err);
    }
  };

  const toggleSection = (workbook, date) => {
    const key = `${workbook}_${date}`;
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClickStartLearning = () => {
    if (selectedBooks.length === 0) return alert("문제집을 선택해주세요");

    let totalItems = 0;
    selectedBooks.forEach((bookName) => {
      const matchedBook = wrongNoteData.find((b) => b.workbook === bookName);
      if (matchedBook) {
        matchedBook.dates.forEach((d) => {
          totalItems += d.questions.length;
        });
      }
    });

    const firstBook = wrongNoteData.find(
      (b) => b.workbook === selectedBooks[0]
    );
    if (!firstBook) return alert("문제집 정보를 찾을 수 없습니다");

    setCurBook({ id: firstBook.workbookId, items: totalItems });
    setSequence(1);
  };

  const handleConfirmLearning = async () => {
    if (!selectedBooks.length || !wrongNoteData.length) {
      return alert("문제집 선택 또는 데이터가 없습니다");
    }

    let collectedQuestions = [];

    selectedBooks.forEach((bookName) => {
      const book = wrongNoteData.find((b) => b.workbook === bookName);
      if (book) {
        book.dates.forEach((d) => {
          d.questions.forEach((q) => {
            collectedQuestions.push({
              name: q.title,
              answer: q.answer,
              type:
                q.type === "객관식"
                  ? "MULTIPLE_CHOICE"
                  : q.type === "O/X"
                  ? "OX"
                  : "FILL_IN_THE_BLANK",
              ...(q.options?.length > 0 && {
                opt: q.options.join("/"),
              }),
            });
          });
        });
      }
    });

    if (!collectedQuestions.length) {
      return alert("학습할 문제가 없습니다");
    }

    // localStorage에 저장
    localStorage.setItem(
      "tempQuestionData",
      JSON.stringify(collectedQuestions)
    );

    // Question 페이지로 이동
    router.push({
      pathname: "/Question",
      query: { type: 3 },
    });
  };

  return (
    <WrongNoteUI
      selectedDateRange={selectedDateRange}
      setSelectedDateRange={setSelectedDateRange}
      data={wrongNoteData}
      selectedBooks={selectedBooks}
      setSelectedBooks={setSelectedBooks}
      isSelectMode={isSelectMode}
      setIsSelectMode={setIsSelectMode}
      toggleSection={toggleSection}
      openSections={openSections}
      onToggleBookSelect={(id) => {
        setSelectedBooks((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      }}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      selectedQuestion={selectedQuestion}
      setSelectedQuestion={setSelectedQuestion}
      showAnswer={showAnswer}
      setShowAnswer={setShowAnswer}
      isDateModalOpen={isDateModalOpen}
      setIsDateModalOpen={setDateModalOpen}
      tempStart={tempStart}
      tempEnd={tempEnd}
      setTempStart={setTempStart}
      setTempEnd={setTempEnd}
      handleApplyDateFilter={() => {
        setSelectedDateRange({ start: tempStart, end: tempEnd });
        setDateModalOpen(false);
      }}
      handleQuickRange={(type) => {
        const now = new Date();
        now.setHours(now.getHours() + 9);
        const start = new Date(now);
        const end = new Date(now);

        if (type === "yesterday") {
          start.setDate(start.getDate() - 1);
          end.setDate(end.getDate() - 1);
        } else if (type === "3days") start.setDate(start.getDate() - 2);
        else if (type === "7days") start.setDate(start.getDate() - 6);

        const format = (d) => d.toISOString().split("T")[0];
        setTempStart(format(start));
        setTempEnd(format(end));
      }}
      onClickStartLearning={handleClickStartLearning}
      onQuestionClick={(q) => {
        setSelectedQuestion(q);
        setModalOpen(true);
        setShowAnswer(false);
      }}
      curBook={curBook}
      sequence={sequence}
      setSequence={setSequence}
      setCurBook={setCurBook}
      count={count}
      setCount={setCount}
      isTest={isTest}
      setIsTest={setIsTest}
      onConfirmLearning={handleConfirmLearning}
    />
  );
}
