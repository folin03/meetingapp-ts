// end point calls

export const UserDetailsFromToken = token => {
  console.log('Token ' + token);
  fetch('https://meet-me-app.herokuapp.com/verify-user-token/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
};

export default UserDetailsFromToken;
