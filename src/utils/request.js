import { toast } from 'react-toastify';
import { path, STORE_KEY } from './constants';
import { history } from './history';

async function submit(method, url, body = null, customHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = sessionStorage.getItem(STORE_KEY);
  if (token) headers.Authorization = `Bearer ${token}`;

  const config = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, config);
    const contentType = res.headers.get('content-type');
    const isJSON = contentType && contentType.includes('application/json');
    const responseData = isJSON ? await res.json() : {};

    if (!res.ok) {
      const errorMsg = responseData.message || `Error ${res.status}`;

      switch (res.status) {
        case 401:
          sessionStorage.removeItem(STORE_KEY);
          break;
        case 500:
          history.navigate(path.serverError);
          break;
        default:
          break;
      }

      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    return responseData;
  } catch (err) {
    if (!err.message.includes('Unauthorized')) {
      toast.error(err.message || 'Something went wrong');
    }
    throw err;
  }
}

export { submit };
