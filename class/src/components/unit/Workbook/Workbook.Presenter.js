// ✅ 수정된 WorkbookUI.js
import { useState } from "react";
import {
  Wrapper,
  Header,
  BackButton,
  Title,
  ControlBar,
  FilterWrapper,
  QuestionCard,
  QuestionRow,
  QuestionTextWrapper,
  QuestionTitle,
  OptionWrapper,
  Option,
  OptionNumber,
  Answer,
  AnswerLabel,
  Checkbox,
  Divider,
  ActionButtonGroup,
  ActionButton,
  ScrollToTopButton,
  ToggleWrapper,
  ToggleAnswerSingleButton,
} from "./Workbook.Styles";
import { BackIcon, ArrowUpIcon } from "@/utils/SvgProvider";

export default function WorkbookUI({
  title,
  questions,
  onBack,
  deleteMode,
  moveMode,
  onToggleDeleteMode,
  onToggleMoveMode,
  onSelect,
  selectedIds,
  onOpenDeleteModal,
  onOpenMoveModal,
  isSelectMode,
  setIsSelectMode,
  scrollToTop,
  showScrollTop,
}) {
  const [localAnswerMap, setLocalAnswerMap] = useState({});

  const toggleLocalAnswer = (id) => {
    setLocalAnswerMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCancel = () => {
    setIsSelectMode(false);
    onToggleDeleteMode(false);
    onToggleMoveMode(false);
  };

  const renderOptions = (q, showAnswer) => {
    const opts = q.opt ? q.opt.split("|||") : [];

    if (q.type === "MULTIPLE_CHOICE") {
      return (
        <OptionWrapper>
          {opts.map((optStr, i) => {
            const label = optStr[0];
            const text = optStr.slice(2);
            const isAnswer = Number(q.answer) === i + 1;
            return (
              <Option key={i}>
                <OptionNumber isAnswer={showAnswer && isAnswer}>
                  {label}
                </OptionNumber>
                <div>{text}</div>
              </Option>
            );
          })}
        </OptionWrapper>
      );
    }

    if (q.type === "OX") {
      return (
        <OptionWrapper>
          <Option>
            <OptionNumber isAnswer={showAnswer && q.answer === "O"}>
              1
            </OptionNumber>{" "}
            O
          </Option>
          <Option>
            <OptionNumber isAnswer={showAnswer && q.answer === "X"}>
              2
            </OptionNumber>{" "}
            X
          </Option>
        </OptionWrapper>
      );
    }

    if (q.type === "FILL_IN_THE_BLANK") {
      return (
        <Answer>
          <AnswerLabel isAnswer={showAnswer}>A</AnswerLabel>
          {showAnswer ? q.answer : null}
        </Answer>
      );
    }

    return null;
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={onBack}>
          <BackIcon />
        </BackButton>
        <Title>{title}</Title>
      </Header>

      <ControlBar>
        {!isSelectMode ? (
          <FilterWrapper>
            <ActionButton
              onClick={() => {
                setIsSelectMode(true);
                onToggleDeleteMode(true);
                onToggleMoveMode(true);
              }}
            >
              선택
            </ActionButton>
          </FilterWrapper>
        ) : (
          <ActionButtonGroup>
            <ActionButton
              onClick={onOpenMoveModal}
              disabled={selectedIds.length === 0}
            >
              문제 이동
            </ActionButton>
            <ActionButton
              onClick={onOpenDeleteModal}
              disabled={selectedIds.length === 0}
            >
              문제 삭제
            </ActionButton>
            <ActionButton onClick={handleCancel}>선택취소</ActionButton>
          </ActionButtonGroup>
        )}
      </ControlBar>

      <Divider />

      {questions && questions.length > 0 ? (
        questions.map((q, idx) => (
          <QuestionCard
            key={q.encryptedQuestionId}
            onClick={() => {
              if (deleteMode || moveMode || isSelectMode) {
                onSelect(q.encryptedQuestionId);
              }
            }}
            style={{ cursor: isSelectMode ? "pointer" : "default" }}
          >
            <QuestionRow>
              <QuestionTextWrapper>
                <QuestionTitle>
                  <div>Q{idx + 1}</div>
                  <div>{q.name.replace(/\{BLANK\}/g, "OOO")}</div>
                </QuestionTitle>
                {renderOptions(q, localAnswerMap[q.encryptedQuestionId])}
              </QuestionTextWrapper>

              <ToggleWrapper>
                {!isSelectMode && (
                  <ToggleAnswerSingleButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLocalAnswer(q.encryptedQuestionId);
                    }}
                  >
                    {localAnswerMap[q.encryptedQuestionId]
                      ? "정답 숨기기"
                      : "정답 보기"}
                  </ToggleAnswerSingleButton>
                )}

                {deleteMode || moveMode || isSelectMode ? (
                  <Checkbox
                    type="checkbox"
                    checked={selectedIds.includes(q.encryptedQuestionId)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => onSelect(q.encryptedQuestionId)}
                  />
                ) : (
                  <div style={{ width: "16px", height: "16px" }} />
                )}
              </ToggleWrapper>
            </QuestionRow>
          </QuestionCard>
        ))
      ) : (
        <div>문제가 없습니다.</div>
      )}

      {showScrollTop && (
        <ScrollToTopButton onClick={scrollToTop}>
          <ArrowUpIcon />
        </ScrollToTopButton>
      )}
    </Wrapper>
  );
}
