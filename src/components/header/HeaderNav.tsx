import LinkButton from "components/button/LinkButton";

const HeaderNav = (): JSX.Element => {
  return (
    <div className="bg-emerald-500 text-xl flex sticky top-0 z-20">
      <LinkButton
        to="/search"
        plusStyle="hover:bg-emerald-100 flex-1 outline outline-1"
      >
        登場シーン
      </LinkButton>
      <LinkButton
        to="/wiseword"
        plusStyle="hover:bg-emerald-100 flex-1 outline outline-1"
      >
        名言
      </LinkButton>
      <LinkButton
        to="/"
        plusStyle="hover:bg-emerald-100 flex-1 outline outline-1"
      >
        事件
      </LinkButton>
    </div>
  );
};

export default HeaderNav;
