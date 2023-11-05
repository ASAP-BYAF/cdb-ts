import BaseFrame from "./BaseFrame";
import WiseWord from "./WiseWord";

const Home = () => {
  return (
    <BaseFrame>
      <WiseWord person="江戸川コナン" word="真実はいつも一つ" />
      <WiseWord
        person="ホームズ"
        word="人生という無色の糸の束には殺人という真っ赤な糸が混ざっている。それを解きほぐすことが我々の仕事何じゃないのかな。"
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
    </BaseFrame>
  );
};

export default Home;
