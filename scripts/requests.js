const Config = {
//URL_API: "https://api.instagram.com/oauth/access_token",
URL_API: "https://graph.instagram.com/access_token",
URL_API_DATA: "https://graph.instagram.com/",
};
const Requests = {};
/*
Requests.getLongToken = (params) => {
  return fetch(`${Config.URL_API}`, {
    method: "GET",
    body: params,
  });
};
*/
/*
Requests.getLongToken = (params) => {
  return new Promise((resolve, reject) => {
    $.get(`${Config.URL_API}`, params)
      .done((rta) => resolve(rta))
      .fail((rta) => reject(rta));
  });
};*/

Requests.getLongToken = (client_secret,access_token,grant_typeLong) => {
  return new Promise((resolve, reject) => {
    $.getJSON(`${Config.URL_API}?client_secret=${client_secret}&access_token=${access_token}&grant_type=${grant_typeLong}`)
      .done((rta) => resolve(rta))
      .fail((error) => reject(error.responseJSON));
  });
};


Requests.getUserDataInfo = (user_id,access_token) => {
  return new Promise((resolve, reject) => {
    $.getJSON(`${Config.URL_API_DATA}${user_id}?access_token=${access_token}&fields=account_type,username,media_count`)
      .done((rta) => resolve(rta))
      .fail((error) => reject(error.responseJSON));
  });
};


/*
Requests.getLongToken = (client_secret,access_token,grant_typeLong) => {
  return fetch(`${Config.URL_API}?client_secret=${client_secret}&access_token=${access_token}&grant_typeLong=${grant_typeLong}`, {
    method: "GET"
  });
};
*/
