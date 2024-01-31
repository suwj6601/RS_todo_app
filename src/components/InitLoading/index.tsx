import 'src/css/init_loading.scss';

export default function InitLoading({ children }) {
  const isInit = true;

  const renderLoading = (
    <div className='loader-container'>
      <div className='splash-screen'>
        <svg viewBox='25 25 50 50'>
          <circle cx='50' cy='50' r='20'></circle>
        </svg>
      </div>
    </div>
  );
  return isInit ? renderLoading : children;
}
