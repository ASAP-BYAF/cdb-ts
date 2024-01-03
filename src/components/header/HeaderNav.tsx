import LinkButton from "components/button/LinkButton";

const HeaderNav = (): JSX.Element => {
  return (
    <div className="flex sticky top-0 z-20">
      <LinkButton to="/search" plusStyle="flex-1 outline outline-1">
        登場話
      </LinkButton>
      <LinkButton to="/wiseword" plusStyle="flex-1 outline outline-1">
        名言
      </LinkButton>
      <LinkButton to="/" plusStyle="flex-1 outline outline-1">
        事件
      </LinkButton>
    </div>
  );
};

export default HeaderNav;
