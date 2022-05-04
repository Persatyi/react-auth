import { useSelector } from 'react-redux';
import s from './Loader.module.css';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  const loading = useSelector(state => state.loading);

  return loading ? (
    <div className={s.loader}>
      <Oval color="#00BFFF" height={80} width={80} />
    </div>
  ) : null;
};

export default Loader;
