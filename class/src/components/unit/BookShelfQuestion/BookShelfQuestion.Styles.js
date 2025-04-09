import styled from "@emotion/styled";

export const BookShelfQuestion__Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  overflow: hidden;

  display: flex;
  justify-content: center;
`;

export const BookShelfQuestion__Container = styled.div`
  width: 100%;
  height: 100%;

  max-width: 500px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  padding: 20px 8px;
`;

export const BookShelfQuestion__Modal = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 16px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;

  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ffffff;
`;

export const BookShelfQuestion__Title = styled.div`
  width: 100%;
  padding-bottom: 8px;

  text-align: center;
  border-bottom: 1px solid #d9d9d9;

  font-size: 20px;
  font-weight: 700;
`;

export const BookShelfQuestion__SubTitle = styled.div`
  width: 100%;
  margin-top: 24px;

  text-align: center;

  font-size: 16px;
  font-weight: 700;
`;

// 전체 컨테이너 - 포지셔닝 컨텍스트 설정
export const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 25px; /* 현재 값 표시를 위한 공간 */
`;

// 컨테이너 스타일
export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

// 숫자 표시 컨테이너
export const ValuesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  font-size: 12px;
  color: #666;
`;

// 현재 진행 바 스타일
export const Progress = styled.div`
  height: 100%;
  width: ${(props) => (props.value / props.max) * 100}%;
  background-color: #ffeb3b; /* 노란색 */
  border-radius: 10px;
  transition: width 0.3s ease;
`;

// 현재 값 표시
export const CurrentValue = styled.div`
  position: absolute;
  top: 5px;
  left: ${(props) => (props.value / props.max) * 100}%;
  transform: translateX(-50%);
  color: #333;

  font-size: 12px;
  color: #666;
`;

export const BookShelfQuestion__CountContainer = styled.div`
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  gap: 10px;

  margin-top: 10px;
`


export const BookShelfQuestion__Input = styled.input`
  width: 48px;
  height: 24px;

  border-radius: 5px;
  border: 0;
  background-color: #d9d9d9;

  text-align: center;
`;

export const BookShelfQuestion__submitButton = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 40px;

  border-radius: 20px;
  margin-top: 20px;
  border: 1px solid #d9d9d9;

  background-color: #3b82f6;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;


export const BookShelfQuestion__CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BookShelfQuestion__CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;


export const BookShelfQuestion__isTestButton = styled.button`
  width: 20px;
  height: 20px;

  background-color: ${(props) => props.isTest?"yellow":null};
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`

