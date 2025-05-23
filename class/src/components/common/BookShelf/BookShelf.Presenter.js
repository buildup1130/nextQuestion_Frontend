import { useState } from "react";
import { ArrowUpIcon } from "@/utils/SvgProvider";
import {
  Container,
  Header,
  Title,
  Divider,
  FilterRow,
  FilterGroup,
  FilterSelect,
  FilterActionGroup,
  SearchWrapper,
  StyledSearchInput,
  SearchIcon,
  BookList,
  BookItem,
  BookCheckbox,
  MoreButton,
  OptionPopup,
  OptionItem,
  AddBookArea,
  SelectButton,
  DeleteButton,
  BottomFloatingButton,
  ModalWrapper,
  ModalContent,
  TileGrid,
  TileItem,
  Card,
  CardTop,
  CardBottom,
  CardTitle,
  CardInfo,
  CardActions,
  TileTopRightButton,
  PlusCard,
  BookInfoLeft,
  BookTitle,
  BookDate,
  BookInfoRight,
  BookCount,
  ScrollToTopButton,
} from "./BookShelf.Styles";

import {
  WorkBookIcon,
  TrashIcon,
  EditIcon,
  BookIcon2,
} from "@/utils/SvgProvider";

export default function BookShelfUI(props) {
  const {
    books,
    searchQuery,
    onSearchChange,
    onMoreClick,
    onClickBook,
    onClickLearningMode,
    onClickLearningStart,
    isSelectMode,
    isSmallScreen,
    selectedBookIds,
    onOpenCreateModal,
    isCreateModalOpen,
    newWorkbookTitle,
    setNewWorkbookTitle,
    onCreateWorkbook,
    onCloseCreateModal,
    onClickRename,
    onClickDelete,
    viewType,
    setViewType,
    isLearningModalOpen,
    sortOption,
    setSortOption,
    scrollToTop,
    showScrollTop,
  } = props;

  const [optionOpenId, setOptionOpenId] = useState(null);

  const closeOptionPopup = () => setOptionOpenId(null);

  const renderListItem = (book) => {
    const isSelected = selectedBookIds.includes(book.id);
    return (
      <BookItem
        key={book.id}
        onClick={() => book.items > 0 && onClickBook(book)}
      >
        <BookInfoLeft>
          <BookTitle>{book.title}</BookTitle>
          <BookDate>최근 학습일: {book.date}</BookDate>
        </BookInfoLeft>

        <BookInfoRight>
          <BookCount>{book.items}문제</BookCount>
          {isSelectMode && !isLearningModalOpen ? (
            <BookCheckbox
              type="checkbox"
              checked={isSelected}
              onClick={(e) => e.stopPropagation()}
              onChange={() => onClickBook(book)}
            />
          ) : !isSelectMode && !isLearningModalOpen ? (
            <MoreButton
              onClick={(e) => {
                e.stopPropagation();
                setOptionOpenId(optionOpenId === book.id ? null : book.id);
              }}
            >
              ⋮
            </MoreButton>
          ) : null}
        </BookInfoRight>

        {!isSelectMode && optionOpenId === book.id && !isLearningModalOpen && (
          <OptionPopup>
            <OptionItem
              onClick={(e) => {
                e.stopPropagation();
                closeOptionPopup();
                onMoreClick(book, "learn");
              }}
            >
              <TrashIcon style={{ width: 16, height: 16, marginRight: 6 }} />{" "}
              학습하기
            </OptionItem>
            <OptionItem
              onClick={(e) => {
                e.stopPropagation();
                closeOptionPopup();
                onClickRename(book);
              }}
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <EditIcon style={{ width: 16, height: 16, marginRight: 6 }} />{" "}
              수정하기
            </OptionItem>
            <OptionItem
              onClick={(e) => {
                e.stopPropagation();
                closeOptionPopup();
                onClickDelete(book);
              }}
            >
              <BookIcon2 style={{ width: 16, height: 16, marginRight: 6 }} />{" "}
              삭제하기
            </OptionItem>
          </OptionPopup>
        )}
      </BookItem>
    );
  };

  const renderTileItem = (book) => {
    const isSelected = selectedBookIds.includes(book.id);
    return (
      <TileItem
        key={book.id}
        onClick={() => book.items > 0 && onClickBook(book)}
      >
        <Card>
          <CardTop>
            <WorkBookIcon size={32} color="#6D78FF" />
            {isSelectMode && !isLearningModalOpen ? (
              <TileTopRightButton onClick={(e) => e.stopPropagation()}>
                <BookCheckbox
                  type="checkbox"
                  checked={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickBook(book);
                  }}
                  onChange={() => {}}
                />
              </TileTopRightButton>
            ) : !isSelectMode && !isLearningModalOpen ? (
              <TileTopRightButton>
                <MoreButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionOpenId(optionOpenId === book.id ? null : book.id);
                  }}
                >
                  ⋮
                </MoreButton>
              </TileTopRightButton>
            ) : null}
          </CardTop>

          <CardBottom>
            <CardTitle>{book.title}</CardTitle>
            <CardInfo>
              <div>{book.items}문제</div>
              <div>최근: {book.date}</div>
            </CardInfo>
            <CardActions>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClickBook(book);
                }}
              >
                문제보기
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoreClick(book, "learn");
                }}
              >
                학습하기
              </button>
            </CardActions>
          </CardBottom>

          {!isSelectMode &&
            optionOpenId === book.id &&
            !isLearningModalOpen && (
              <OptionPopup>
                <OptionItem
                  onClick={(e) => {
                    e.stopPropagation();
                    closeOptionPopup();
                    onMoreClick(book, "learn");
                  }}
                >
                  <TrashIcon
                    style={{ width: 16, height: 16, marginRight: 6 }}
                  />{" "}
                  학습하기
                </OptionItem>
                <OptionItem
                  onClick={(e) => {
                    e.stopPropagation();
                    closeOptionPopup();
                    onClickRename(book);
                  }}
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <EditIcon style={{ width: 16, height: 16, marginRight: 6 }} />{" "}
                  수정하기
                </OptionItem>
                <OptionItem
                  onClick={(e) => {
                    e.stopPropagation();
                    closeOptionPopup();
                    onClickDelete(book);
                  }}
                >
                  <BookIcon2
                    style={{ width: 16, height: 16, marginRight: 6 }}
                  />{" "}
                  삭제하기
                </OptionItem>
              </OptionPopup>
            )}
        </Card>
      </TileItem>
    );
  };

  return (
    <Container>
      <Header>
        <Title>책장</Title>
      </Header>

      <SearchWrapper>
        <SearchIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 015.293 13.707l5 5a1 1 0 01-1.414 1.414l-5-5A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
          </svg>
        </SearchIcon>
        <StyledSearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="검색어를 입력하세요"
        />
      </SearchWrapper>

      <FilterRow>
        <FilterGroup>
          <FilterSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">이름</option>
            <option value="created">등록순</option>
            <option value="count">문제 수</option>
          </FilterSelect>
          <FilterSelect
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="list">리스트형</option>
            <option value="tile">타일형</option>
          </FilterSelect>
        </FilterGroup>

        <FilterActionGroup>
          {isSelectMode && (
            <DeleteButton
              disabled={selectedBookIds.length === 0}
              onClick={onClickDelete}
            >
              삭제
            </DeleteButton>
          )}
          <SelectButton onClick={onClickLearningMode}>
            {isSelectMode ? "취소" : "선택"}
          </SelectButton>
        </FilterActionGroup>
      </FilterRow>

      {viewType === "list" ? (
        <>
          <BookList>
            {books.map((book, idx) => (
              <div key={book.id}>
                {renderListItem(book)}
                {idx < books.length - 1 && <Divider />}
              </div>
            ))}
          </BookList>
          <AddBookArea onClick={onOpenCreateModal}>＋</AddBookArea>
        </>
      ) : (
        <>
          <TileGrid>
            {books.map(renderTileItem)}
            <TileItem onClick={onOpenCreateModal}>
              <PlusCard>＋</PlusCard>
            </TileItem>
          </TileGrid>
        </>
      )}

      {isCreateModalOpen && (
        <ModalWrapper onClick={onCloseCreateModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>문제집 생성</h3>
            <input
              value={newWorkbookTitle}
              onChange={(e) => setNewWorkbookTitle(e.target.value)}
              placeholder="문제집 이름을 입력하세요"
              maxLength={17}
            />
            <button onClick={onCreateWorkbook}>생성하기</button>
            <button onClick={onCloseCreateModal}>취소</button>
          </ModalContent>
        </ModalWrapper>
      )}

      {isSelectMode && selectedBookIds.length > 0 && (
        <BottomFloatingButton onClick={onClickLearningStart}>
          {selectedBookIds.length}개 과목 학습하기
        </BottomFloatingButton>
      )}

      {showScrollTop && (
        <ScrollToTopButton onClick={scrollToTop}>
          <ArrowUpIcon />
        </ScrollToTopButton>
      )}
    </Container>
  );
}
