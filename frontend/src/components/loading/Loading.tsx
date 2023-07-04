import loadingGifUrl from '../../assets/loading.gif';
import './Loading.scss';

export function Loading() {
  return <img className="Loading" src={loadingGifUrl}></img>;
}
