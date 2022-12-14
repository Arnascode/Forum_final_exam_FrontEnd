export async function myFetch(url, method = 'GET', data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;

    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetch error ===', error);
  }
}

export async function myFetchAuth(url, token) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}
export async function myFetchAuthAnswer(url, token, id) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}

export async function myFetchAdd(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;

    const resp = await fetch(url, options);
    console.log(resp.status);
    if (resp.status === 201) {
      return true;
    }
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}
export async function myDelete(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'DELETE' ? 'DELETE' : 'GET';
    options.body = data ? JSON.stringify(data) : null;

    const resp = await fetch(url, options);
    console.log(resp.status);
    if (resp.status === 201) {
      return true;
    }
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}
export async function myPatch(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'PATCH' ? 'PATCH' : 'GET';
    options.body = data ? JSON.stringify(data) : null;

    const resp = await fetch(url, options);
    console.log(resp.status);
    if (resp.status === 201) {
      return true;
    }
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}

export const baseUrl = process.env.REACT_APP_BACKEND_URL;
if (!baseUrl) throw new Error('baseUrl nerastas');
