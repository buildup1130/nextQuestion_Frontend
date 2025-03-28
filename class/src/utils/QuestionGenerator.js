import axios from "axios"


export const createQuestion = (file,numOfQuestions,token,setIsCreated,setQuestionArr,setQuestionInfoArr) =>{
    const formData = new FormData();
    //QuestionArr 초기화
    setQuestionArr(undefined);
    
    setIsCreated(true);
    
    //isAuth 함수로 대체해야함    
    if(token){
        formData.append("file",file);
        formData.append("numOfQuestions", numOfQuestions);
        generateQuestion_member(formData,token).then(
            (res) => {
                const tmpArr = [];
                const infoArr = [];
                res?.forEach((element) =>{
                    tmpArr.push(element.encryptedQuestionInfoId);
                    //{Blank} OOO로 변경
                    const tmpName = element.type === 'FILL_IN_THE_BLANK'?element.name.replace('{BLANK}','OOO'):element.name;

                    const tmpObj = {
                        name: tmpName,
                        type: element.type,
                        answer: element.answer,
                        opt: element.opt,
                    }
                    infoArr.push(tmpObj);
                })
                console.log(tmpArr);
                console.log(infoArr);
                setQuestionArr(tmpArr);
                setQuestionInfoArr(infoArr);
                setIsCreated(true);
            }
        )
    }else{
        formData.append("file",file);
        generateQuestion_nonMember(formData).then(
            (res) =>{
                const tmpArr = [];
                res?.questions.forEach((element) =>{
                    tmpArr.push(element);
                })
                console.log(tmpArr);
                setQuestionArr(tmpArr);
                setIsCreated(true);
            }
        )
    }
}

const generateQuestion_member = async(formData,token) =>{
    try {
        const response = await axios.post(
          "http://localhost:8080/member/questions/upload",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // 토큰 추가
                }
            }
        );
        console.log("회원 문제 생성");
        console.dir(response.data)
        return response.data;
    }catch(error)
        {
            console.error(error);
        }
}

const generateQuestion_nonMember = async(formData) =>{
    try {
        const response = await axios.post(
          "http://localhost:8080/public/questions/upload",
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            } 
        }
        );
        console.log("비회원 문제 생성");
        console.dir(response.data);
        return response.data;
    }catch(error)
        {
            
            console.error(error);
        }
}