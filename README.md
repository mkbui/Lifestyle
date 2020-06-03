# Lifestyle
> github repository for project in Software Engineering
> develop a lifestyle monitoring and advisor mobile app

## Introduction & Specifications
This readme serves as an outline and configuration specifications for the project.
Basic specifications (so far):
- Main Development Framework: React Native
- Platform: Mobile (currently Android only)
- Dependencies: React Native libraries, Native Base, React Navigation
- Database prototype: AsyncStorage + .json data file

---

## Installation
This installation is important to accurately set up and run the project without error.

### React Native set-up
Closely follow the installation guide in the official React Native installation guide: 

<a href="https://reactnative.dev/docs/environment-setup" target="_blank">Setting up the development environment</a>

Choose *React Native CLI Quickstart* tab and follow the guide. 
The command line in setting up can be run on *Windows Powershell* (as administrator)

Quick note: after seting up Android Studio, you may want to move *.gradle* and *.android* folder (defaultly located in C:\Users\<Username>).
Since these two folders can occupy a lot of disk storage as projects grow, it is advised to move the folder to another secondary disk.
Follow closely this link if you wish to do so: 
<a href="https://www.littlecpu.com/android-studio-c-drive" target="_blank">Moving Android Studio Folder</a>

Note: if the android setup is not working after moving folders, you may have to add *ANDROID_AVD_HOME* and *JAVA_HOME* to environment 
variables (similar to *ANDROID_SDK_HOME*) to the folders containing your 
### Code Editor set-up
React Native projects can be compiled and run automatically in Powershell using built-in Node. 
Therefore, only a code editor is needed to make progress.

You could try options like VSCode, Sublime, or other editors that support React Native syntaxing and github synchronization.

For Visual Studio Code, you first need to download from the official website:
<a href="https://code.visualstudio.com/Download" target="_blank">VSCode Download</a>

After installing, open VSCode and download these extensions:

- GitHub Pull Requests and Issues (GitHub) - *github.vscode-pull-request-github*

- React Native Tools (Microsoft) - *msjsdiag.vscode-react-native*

### Clone repository
You can choose two options to clone and run the original repository:

- On Powershell, at local project folder:

```
git clone https://github.com/mkbui/Lifestyle.git
cd Lifestyle
yarn
```
- Download this repository as zipped file. On your Powershell, at local project folder:
```
npx react-native init Lifestyle
```

Then copy *App.js*, *assets*, *src* from the zipped folder to your local Lifestyle folder (replace file if asked).

### Configuring packages and dependencies

After initializing the project, you need to add necessary dependencies. The following is required (so far):

```
yarn add native-base 
yarn add react-native-vector-icons
yarn add @react-navigation/native @react-navigation/stack @react-navigation/drawer react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
yarn add @react-navigation/compat
```

After that, access *./android/app/build.gradle* and add the following line to the file:

```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

This is necessary to render icons on Android virtual device

### Run the project
Try 
```
npx react-native run-android 
```

and wait for the project to compile and build successfully. You should be able to see two additional terminals popping up, plus an Android
Virtual Device screen. Sometimes the build takes too long for the first time, so you might have to turn off the Node terminal and
do *npx react-native run-android* again.

### Editing the projects and push to Github
After making sure the project runs as expected, open VSCode make some changes to the code in project (some text output if first time). 

After making some changes to the project, you may want to commit the changes to Github. In the tab *Source Control* on the left side bar,
comment on your changes and choose commit to save your changes. You may also want to create a new branch for your own source, and only
pull request when confirming changes to the master route.

