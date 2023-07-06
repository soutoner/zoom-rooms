import loadingGifUrl from 'src/assets/loading.gif';
import 'src/components/loading/Loading.scss';

export function Loading() {
  return <img className="Loading" src={loadingGifUrl}></img>;
}
