import NProgress from 'nprogress';
import { useEffect } from 'react';

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return null;
}

export default SuspenseLoader;
