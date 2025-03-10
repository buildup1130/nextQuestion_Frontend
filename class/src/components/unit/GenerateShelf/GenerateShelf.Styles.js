import styled from "@emotion/styled"

export const GenerateShelf__Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:rgba(0, 0, 0, 0.5);
  z-Index: 10;

  overflow: hidden;

  display:flex;
  justify-content:center;
`;

export const GenerateShelf__Container = styled.div`
  width:100%;
  height:100%;

  max-width:500px;

  display:flex;
  justify-content:center;
  align-items:center;

  z-index:100;

  padding: 20px 8px;
`

export const GenerateShelf__Shelf = styled.div`
  width:100%;
  /* height:100%; */
  max-height:100%;
  padding: 16px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;

  box-shadow: 0 16px 24px rgba(0,0,0,0.1);

  display:flex;
  flex-direction:column;
  align-items:center;

  background-color:#ffffff;
`

export const GenerateShelf__Shelf__Title = styled.div`
  width:100%;

  font-size:20px;
  font-weight:700;

  display:flex;
  flex-direction:row;
  justify-content:space-between;
`

export const GenerateShelf__Shelf__Title__Button = styled.button`
  width:32px;
  height:32px;

  background-color:#ffffff;
  border:0;

  font-size:28px;
`

export const GenerateShelf__Shelf__Container = styled.div`
  width:100%;
  margin-top:20px;

  display:flex;
  flex-direction:row;
  justify-content:center;
`

export const GenerateShelf__Shelf__Select = styled.select`
  width:100%;
  height:40px;

  font-size:16px;

  text-align:center;
`

export const GenerateShelf__Shelf__Select__Button = styled.button`
  width:40px;
  height:40px;

  background-color:#ffffff;
  border:0;

  font-size:30px;
`

export const GenerateShelf__Shelf__Input__Container = styled.div`
  width:100%;
  margin-top:20px;
  padding: 0 8px;

  display:flex;
  flex-direction:row;
  justify-content:center;
  gap:10px;
`

export const GenerateShelf__Shelf__Input = styled.input`
  width:100%;

`

export const GenerateShelf__Shelf__Input__Button = styled.button`
  height:40px;
  width:80px;

border-radius: 20px;
border: 1px solid #d9d9d9;

background-color: #3b82f6;
color: white;

display:flex;
justify-content:center;
align-items:center;

cursor: pointer;

  font-size:16px;

  white-space:nowrap;
`

export const GenerateShelf__Shelf__submitButton = styled.div`
width:100%;
max-width:500px;
min-height:52px;

border-radius: 20px;
margin-top:40px;
border: 1px solid #d9d9d9;

background-color: #3b82f6;
color: white;

display:flex;
justify-content:center;
align-items:center;

cursor: pointer;
`

export const GenerateShelf__Shelf__QuestionWrapper = styled.div`
  width:100%;
  height:100%;
  padding: 0 8px;

  border: 1px solid #d9d9d9;
  overflow-y: scroll;
  overflow-x: hidden;

  display:flex;
  flex-direction:column;
  justify-content:flex-start;
`
export const GenerateShelf__Shelf__QuestionContainer = styled.div`
  margin-top:8px;
`

export const GenerateShelf__Shelf__QuestionTitle = styled.div`
  font-size:20px;
  font-weight:700;
`
export const GenerateShelf__Shelf__QuestionText = styled.div`
  font-size:16px;
`

export const GenerateShelf__Shelf__ButtonContainer = styled.div`
  width:100%;
  padding: 0 8px;

  display:flex;
  flex-direction:row;
  gap:12px;
`