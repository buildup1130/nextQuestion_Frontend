import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  position: relative;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 0;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
`;

export const Plus = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
  
  transform:translateY(2px);
`

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  width: 100%;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 45px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 16px;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #ccc;
  }
`;

export const SearchButton = styled.button`
  height: 45px;
  width: 45px;
  border: none;
  border-radius: 5px;
  background-color: #000;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

export const BookList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

export const BookItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  cursor:pointer;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
