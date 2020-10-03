## Personal User Profile

This is an example personal profile app with:
- user data validation
- `localStorage` to save user data
- proxy middleware for `POST` request

Created with [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

### Technologies

- [Next.js](https://github.com/vercel/next.js/)
- [Material-UI](https://github.com/mui-org/material-ui)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Express](https://github.com/expressjs/express)
- [body-parser](https://github.com/expressjs/body-parser)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

### Development
```
npm install
npm run dev
```
URL: [http://localhost:3000](http://localhost:3000)

### Unit testing
```
npm run test
```
Using [jest](https://github.com/facebook/jest), [react-testing-library](https://github.com/testing-library/react-testing-library), [jest-dom](https://github.com/testing-library/jest-dom) with [jest-localstorage-mock](https://github.com/clarkbw/jest-localstorage-mock) and [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock).