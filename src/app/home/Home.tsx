import BaseFrame from "components/BaseFrame";
import WiseWord from "app/home/WiseWord";
import { WisewordGet } from "api/wiseword";
import { getWisewordAll } from "api/wiseword";
import { useEffect, useState } from "react";

const Home = (): JSX.Element => {
  const [wisewords, setWisewords] = useState<WisewordGet[]>([]);

  const getAllWiseword = async () => {
    try {
      const res = await getWisewordAll();
      setWisewords(res);
      return;
    } catch {
      console.error("error");
    }
  };

  useEffect(() => {
    getAllWiseword();
  }, []);

  return (
    <BaseFrame>
      <>
        {/* DB のスキーマに合わないので登録されていないが書いておきたいもの */}
        <WiseWord person="江戸川コナン" word="真実はいつも一つ" />
        <WiseWord
          person="ホームズ"
          word="人生という無色の糸の束には殺人という真っ赤な糸が混ざっている。それを解きほぐすことが我々の仕事なんじゃないのかな。"
          reference="ベイカー街の亡霊"
        />
        <WiseWord
          person="ベルモット"
          word="secret makes a woman woman"
          reference="42 巻, File9"
        />
        <WiseWord
          person="江戸川コナン"
          word="不可能な物を除外していって残った物が… たとえどんなに信じられなくても… それが真相なんだ!!"
          reference="28 巻, File9"
        />
        <WiseWord
          person="灰原哀"
          word="相手はイルカ…そう…海の人気者…暗く冷たい海の底から逃げてきたサメなんかじゃとても歯が立たないでしょうね…"
          reference="31 巻, File5"
        />

        {/* DB から値を取得 */}
        {wisewords.map((item) => {
          return (
            <WiseWord
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

export default Home;
