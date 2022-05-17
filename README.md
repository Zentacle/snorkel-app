# snorkel-app
### *This Project was created using `react native init`*

## Instructions for use
- clone this repository
- make sure you have setup your development environment. For reference, see: https://reactnative.dev/docs/environment-setup
- install dependencies via `npm install`
- install `pods` via `npm run pod-install`
- create a `config` folder
  - create two environment files: `.env.dev` and `.env.prod`.
  - fill in the required values for `GOOGLE_MAPS_API_KEY` `GOOGLE_CLIENT_ID` `API_ENDPOINT` `GOOGLE_SERVICE_INFO_API_KEY` and `FACEBOOK_APP_ID`
- run the app. For android, you can just run one of the scripts in the `package.json`, depending on the environment you want to run in. For example, to run a development build, you can do `npm run android-dev` and the emulator should open the app in a device. For iOS, it is easier to open the app using XCode.
