import { useState } from "react";
import { QuestionConfig } from "../../interfaces/QuestionConfig";
import StepOne from "./StepOne";
import StepTwoMC from "./StepTwoMC";
import StepTwoFR from "./StepTwoFR";
import StepThree from "./StepThree";
import ThankYou from "./ThankYou";

export default function DonateView() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [questionConfig, setQuestionConfig] = useState<QuestionConfig>({
    topic: "",
    section: "",
    difficulty: "",
    qtype: "",
    question: {
      question: "",
      image: null,
    },
    answers: [],
  });

  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const prevPage = () => {
    setPageNumber((prev) => prev - 1);
  };

  const updateQuestionConfig = (value: QuestionConfig) => {
    setQuestionConfig(value);
  };

  if (pageNumber === 0) {
    return (
      <StepOne
        questionConfig={questionConfig}
        setQuestionConfig={updateQuestionConfig}
        onNextHandler={nextPage}
      />
    );
  }

  if (pageNumber === 1) {
    return questionConfig.qtype === "mc" ? (
      <StepTwoMC
        questionConfig={questionConfig}
        setQuestionConfig={updateQuestionConfig}
        onNextHandler={nextPage}
        onPrevHandler={prevPage}
      />
    ) : (
      <StepTwoFR
        questionConfig={questionConfig}
        setQuestionConfig={updateQuestionConfig}
        onNextHandler={nextPage}
        onPrevHandler={prevPage}
      />
    );
  }

  if (pageNumber === 2) {
    return (
      <StepThree
        questionConfig={questionConfig}
        onNextHandler={() => {
          console.log(questionConfig);
          // TODO: Attempt to donate this question to db
          nextPage();
        }}
        onPrevHandler={prevPage}
      />
    );
  }

  if (pageNumber === 3) {
    return <ThankYou />;
  }

  return <div></div>;
}
