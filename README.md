# react-native-qr

1.dev mode
- To execute expo project with dev mode. 
	npx expo start
	/* then you can see menu in cmd. for windows. for build apk, you can do on windows system, and for build ipa, you can do on macos.
	a click- android-mode
	r reload - app refresh

2.production mode
 - build app with expo in cmd =======build with expo
	npx eas build -p android --profile preview
	npx eas build -p ios--profile preview

 - Or you can make android and ios project using 'expo eject' ========build with react-native cli.
	android project in windows os, ios project in mac os. 
	After you enter 'expo eject' in cmd, you can see to create android or ios folder in project dir.

	And then you can build app(apk or ipa) using react native cli
