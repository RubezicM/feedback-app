import spinner from '../assets/spinner.gif'

function Spinner (props) {
  return (
    <img src={spinner} alt='Loadinmg...' style={{width:'100px', margin:'auto',display:'block'}}/>
  );
}

export default Spinner;
