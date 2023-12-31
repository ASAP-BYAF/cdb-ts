type SingleWisewordProps = {
  word: string;
  person: string;
  reference?: string;
};

const SingleWiseword = (props: SingleWisewordProps): JSX.Element => {
  const { word, person, reference = "???" } = props;
  return (
    <div className="font-bold py-4 px-8 hover:bg-amber-300 hover:text-black text-white outline outline-1 outline-white">
      <span className="italic font-serif text-4xl">
        <span>{word}</span>"
      </span>
      <sup className="text-sm font-sans not-italic whitespace-nowrap">
        Ref[{reference}]
      </sup>
      <span className="text-lg whitespace-nowrap">【{person}】</span>
    </div>
  );
};

export default SingleWiseword;
