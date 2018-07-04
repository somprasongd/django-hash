# Django Hash

Hash and verify password in auth_user table that created with django admin.

## Install

```npm
npm i django-hash
```

## How to hash

```javascript
const djangoHash = require('django-hash');

const password = 'p@ssw0rd';

djangoHash.hash(password)
  .then(hash => {
    console.log('Hashed: ', hash);
  })
  .catch(err => console.log(err));
// Hashed: pbkdf2_sha256$100000$hxtU/X2nCSo=$WREDUhqfScrEya9kjkHtK/T4hhRG1Y22roZS2EkJSWU=
```

## How to verify

```javascript
const djangoHash = require('django-hash');

const hash = 'pbkdf2_sha256$100000$hxtU/X2nCSo=$WREDUhqfScrEya9kjkHtK/T4hhRG1Y22roZS2EkJSWU=';

// with match password
djangoHash.verify('p@ssw0rd', hash)
  .then(result => {
    console.log('Verified: ', result);
  })
  .catch(err => console.log(err));
// Verified: true

// with wrong password
djangoHash.verify('wrong_password', hash)
  .then(result => {
    console.log('Verified: ', result);
  })
  .catch(err => console.log(err));
// Verified: false
```