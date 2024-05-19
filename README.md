# About SafeSpace
- [SafeSpace](https://safespace525.wixsite.com/home/about-us)

## Introduction
SafeSpace is a mobile app that empowers individuals at-risk for sexual assault by providing resources discreetly. Originally conceived in Flutter, our team set out to redesign the app in React Native with the following goals:

-improve UI appeal to target users 

-improve security for sensitive data storage

-implement functionalities requested by stakeholders' original design documentation

-improve codebase maintainability

-reduce backend upkeep demands and costs

## Technologies Used
Development: Figma, Expo | Frontend: React Native, TypeScript | Backend: SQL, Express

## Set-up
To get the application running, you'll need to have npm. Once you clone the repository to your computer, you will need to run the following to download the node modules to run the application:
```sh
npm install
```
After that, you can start the Expo Go by running the following
```sh
npx expo start 
```
The terminal will give directions to open the application on your preferred device (iOS, Android, or web).

In order to send emails using the app you will need to create an App Password for the gmail address you choose to use as the sender. Click [here](https://support.google.com/mail/answer/185833?hl=en) for directions on how

Once completed input these variables into your .env file
```sh
EMAIL_USER=
EMAIL_PASS=
PORT=
```

Then run this command to start the server
```sh
npm run server-dev
```

## Expo Errors
- Try to upgrade Expo to the latest version `npm install expo@latest`
- Fix any issues with `npx expo install --fix`

## Challenges
- The first challenge was establishing development environments for different developers on different machines and running different emulations for iOS, Android, and web. Maintaining a codebase that did not introduce critical bugs in any one of these platforms was during development was difficult.
- The next challenge was familiarizing ourselves with the tools for the project. The team had varying levels of experience with React Native and Expo Go. Research was necessary at the start of the project to ensure common understanding when working on the project.
- Styling across multiple mobile platforms that offered multiple screen resolutions was also very difficult. The dev team had to constantly balance between something complicated looking that is aesthetically pleasing and something simple looking that will retain proper ratios on different screen resolutions.

## Contributors
- Gabe Jimenez
- John Novakowski
- Anthony Tzeng
- David Tran
- Maximus Chen
