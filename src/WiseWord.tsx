import React from "react";

type WiseWordProps = {
  word: string;
  person: string;
  reference: string;
};

const WiseWord: React.FC<WiseWordProps> = (props: WiseWordProps) => {
  const { word, person, reference = "???" } = props;
  return (
    <div className="font-bold py-4 hover:bg-black hover:text-white relative">
      <span className="italic font-serif text-4xl">
        "<span className="text-emerald-300">{word}</span>"
      </span>
      <sup className="text-sm font-sans not-italic whitespace-nowrap">
        Ref[{reference}]
      </sup>
      <span className="text-lg whitespace-nowrap">【{person}】</span>
    </div>
  );
};

export default WiseWord;
