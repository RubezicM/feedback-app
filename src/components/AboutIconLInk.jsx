import React from 'react';
import { FaQuestion } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AboutIconLInk (props) {
  return (
    <Link to={{
      pathname: '/about',
      search: '?sort=name',
      hash: '#hello'
    }}>
      <FaQuestion size={30} />
    </Link>
  );
}

export default AboutIconLInk;
