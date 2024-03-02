import { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import {
  MAX_STAR,
  MAX_ITEM_DECK,
  MAX_EXPERIENCE_VALUE,
} from "../../../model/constant/app.constant";

class DeckBaseInfoComponentProps {
  totalBaseExperience: number;
  deckCardNumber: number;
}

export function DeckBaseInfoComponent({
  totalBaseExperience,
  deckCardNumber,
}: DeckBaseInfoComponentProps) {
  const [statusClassName, setStatusClassName] = useState<string>("");
  const [statusName, setStatusName] = useState<string>("");
  const [starNumber, setStarNumber] = useState<number>(0);

  useEffect(() => {
    if (deckCardNumber < MAX_ITEM_DECK) {
      setStatusClassName("warning");
      setStatusName("to complete");
    } else if (deckCardNumber === MAX_ITEM_DECK) {
      setStatusClassName("secondary");
      setStatusName("Complete");
    } else {
      setStatusClassName("danger");
      setStatusName("Empty");
    }

    if (deckCardNumber > 0) {
      const starToShow = Math.trunc(
        (totalBaseExperience * MAX_STAR) / MAX_EXPERIENCE_VALUE
      );

      setStarNumber(starToShow);
    } else {
      setStarNumber(0);
    }
  }, [totalBaseExperience, deckCardNumber]);

  return (
    <div className="mb-4">
      <div className="text-start h6 mb-2 form-check">
        Experience: {totalBaseExperience}
      </div>
      <div>
        {Array.from(Array(starNumber).keys()).map((start, index) => (
          <span key={index} className="me-2">
            <StarFill
              title={`Experience: ${totalBaseExperience}`}
              className="text-info h5"
            />
          </span>
        ))}
      </div>
      <div>
        <div className="text-start h6 mb-2 form-check">Status</div>
        <ProgressBar
          title={`${deckCardNumber}/${MAX_ITEM_DECK}`}
          className="progressbar-label-start border"
          variant={statusClassName}
          now={deckCardNumber}
          label={statusName}
          max={MAX_ITEM_DECK}
        ></ProgressBar>
      </div>
    </div>
  );
}
