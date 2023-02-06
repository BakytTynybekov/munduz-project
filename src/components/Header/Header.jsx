import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import img from "../../images/munduz-logo.png";
import basketImg from "../../images/basket.svg";
import { useContext, useEffect, useState } from "react";
import { classNames } from "../../helpers/classNames/classNames";
import { GeneralContext } from "../../context/GeneralContext";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";

function Header() {
  const [header, setHeader] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(null);
  const { sum, updateStateAfterLocalStorage } = useContext(GeneralContext);
  const { user } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();

  const changeTheBackground = () => {
    setLastScrollTop(window.scrollY);
    setHeader(true);
  };
  window.addEventListener("scroll", changeTheBackground);
  useEffect(() => {
    updateStateAfterLocalStorage();
  }, []);

  useEffect(() => {
    if (lastScrollTop < 0.5) {
      setHeader(false);
    }
  }, [lastScrollTop]);
  return (
    <header className={classNames(["header"], { changedHeader: header })}>
      <div className="container">
        <div className="header__inner">
          <div onClick={() => navigate("/")} className="header__logo">
            <img src={img} alt="" />
          </div>
          <nav>
            <ul className="header__menu">
              {!user && (
                <li className="header__menu-item">
                  <Link to="/about" className="header__menu-item-link">
                    {" "}
                    О нас
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li className="header__menu-item">
                    <Link to="/addProduct" className="header__menu-item-link">
                      {" "}
                      Добавить еду
                    </Link>
                  </li>
                  <li className="header__menu-item">
                    <Link to="/orders" className="header__menu-item-link">
                      {" "}
                      Заказы
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {!user && (
              <div
                onClick={() => navigate("./basket")}
                className="header__basket"
              >
                <img src={basketImg} alt="" />
                <p>
                  {sum[1]} <span>/</span> {sum[0]} p.
                </p>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
