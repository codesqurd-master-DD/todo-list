import styled from "styled-components";

import { useState } from "react";
import LogStorage from "./LogStorage";
import Button from "../utils/Button";

const NavBlock = styled.div`
  width: 1440px;
  height: 112px;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-around;
`;
const TitleBlock = styled.div`
  position: absolute;
  width: 200px;
  height: 46px;
  left: 80px;
  top: 33px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 46px;
  color: #010101;
`;

const LogBtnBlock = styled.div`
  width: 34px;
  height: 22px;
  position: absolute;
  right: 84px;
  top: 40px;
`;
function NavBar(props) {
  const { logs } = props;
  const [clicked, setClickState] = useState(false);
  const [appear, setLogViewState] = useState(false);
  const handleLogBtnClick = () => {
    setLogViewState(true);
    setClickState(true);
  };
  return (
    <>
      <NavBlock>
        <TitleBlock>TO-DO LIST</TitleBlock>
        <LogBtnBlock>
          <Button type="menu" onClick={handleLogBtnClick} size="bigSize" />
          {/* <HiMenu className="icon" onClick={handleLogBtnClick} /> */}
        </LogBtnBlock>
      </NavBlock>

      <LogStorage
        logs={logs}
        clicked={clicked}
        appear={appear}
        setLogViewState={setLogViewState}
      ></LogStorage>
    </>
  );
}

export default NavBar;
