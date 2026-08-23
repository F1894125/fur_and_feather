import { useState } from "react";
import FaqSection from "../../components/FaqSection";

const FaqPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <>
      <FaqSection
        openFaqIndex={openFaqIndex}
        handleFaqToggle={handleFaqToggle}
      />
    </>
  );
};

export default FaqPage;
