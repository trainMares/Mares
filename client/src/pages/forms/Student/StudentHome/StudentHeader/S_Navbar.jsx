import React from 'react';
import { Link } from "react-router-dom";


const SNavbar = ({ toggle, setToggle }) => {

  return (

    <nav >
      <ul className="Snav-links">
        <Link to="/dispaly-opportunities">
          <li className="Snav-link">الفرص التدريبية </li>

        </Link>
        <li onClick={() => setToggle(false)} className="Snav-link"> التدريب الإلكتروني</li>

      </ul>

    </nav>
  );
};

export default SNavbar;

