import db from '../base';

export function getAvatar(avatar){

  return db.storage().ref().child(`avatars/${avatar}.png`).getDownloadURL().then(function(url) {
    return url;
  }).catch(function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    console.log(error.code);

    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        return 'https://firebasestorage.googleapis.com/v0/b/game-knights.appspot.com/o/avatars%2Fdefault9.png?alt=media&token=4081e621-a492-4680-87f2-16583ddb51bd'
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        'https://firebasestorage.googleapis.com/v0/b/game-knights.appspot.com/o/avatars%2Fdefault9.png?alt=media&token=4081e621-a492-4680-87f2-16583ddb51bd'
        break;

      case 'storage/canceled':
        // User canceled the upload
        'https://firebasestorage.googleapis.com/v0/b/game-knights.appspot.com/o/avatars%2Fdefault9.png?alt=media&token=4081e621-a492-4680-87f2-16583ddb51bd'
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        'https://firebasestorage.googleapis.com/v0/b/game-knights.appspot.com/o/avatars%2Fdefault9.png?alt=media&token=4081e621-a492-4680-87f2-16583ddb51bd'
        break;
    }
  });
}
