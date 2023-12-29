import BaseFrame from "components/BaseFrame";
import SingleWiseword from "app/home/SingleWiseword";
import { WisewordGet } from "api/wiseword";
import { getWisewordAll } from "api/wiseword";
import { useEffect, useState } from "react";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";

const WisewordBase = (): JSX.Element => {
  const [wisewords, setWisewords] = useState<WisewordGet[]>([]);

  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const getAllWiseword = async () => {
    try {
      setGlobalSpinner(true);
      const res = await getWisewordAll();
      setWisewords(res);
      return;
    } catch {
      console.error("error");
    } finally {
      setGlobalSpinner(false);
    }
  };

  useEffect(() => {
    getAllWiseword();
  }, []);

  return (
    <BaseFrame>
      <>
        {/* DB のスキーマに合わないので登録されていないが書いておきたいもの */}
        <SingleWiseword person="江戸川コナン" word="真実はいつも一つ" />
        <SingleWiseword
          person="ホームズ"
          word="人生という無色の糸の束には殺人という真っ赤な糸が混ざっている。それを解きほぐすことが我々の仕事なんじゃないのかな。"
          reference="ベイカー街の亡霊"
        />
        <SingleWiseword
          person="ベルモット"
          word="secret makes a woman woman"
          reference="42 巻, File9"
        />
        <SingleWiseword
          person="江戸川コナン"
          word="不可能な物を除外していって残った物が… たとえどんなに信じられなくても… それが真相なんだ!!"
          reference="28 巻, File9"
        />
        <SingleWiseword
          person="灰原哀"
          word="相手はイルカ…そう…海の人気者…暗く冷たい海の底から逃げてきたサメなんかじゃとても歯が立たないでしょうね…"
          reference="31 巻, File5"
        />

        {/* DB から値を取得 */}
        {wisewords.map((item) => {
          return (
            <SingleWiseword
              person={item.title}
              word={item.phrase}
              reference={`${item.vol_num} 巻, File ${item.file_num}`}
            />
          );
        })}
      </>
    </BaseFrame>
  );
};

export default WisewordBase;
