
![ngx-mat-tui-calendar](https://user-images.githubusercontent.com/11559541/141514000-da6e6c8a-e00b-4f27-a8c2-b7f28538b2f0.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Development Status](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) 
[![GitHub stars](https://img.shields.io/github/stars/ron2015schmitt/ngx-mat-tui-calendar.svg)](https://github.com/ron2015schmitt/ngx-mat-tui-calendar/stargazers)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ron2015schmitt/ngx-mat-tui-calendar)

[![npm](https://img.shields.io/npm/v/ngx-mat-tui-calendar?label=npm%20package)](https://www.npmjs.com/package/ngx-mat-tui-calendar)
![npm downloads](https://img.shields.io/npm/dt/ngx-mat-tui-calendar?label=npm%20downloads)

# ngx-mat-tui-calendar

This project is an [Angular](https://angular.io/), [Material Design](https://material.angular.io/) wrapper for the [Toast UI Calendar](https://github.com/nhn/tui.calendar), published via [![npm-logo_1-tiny](https://user-images.githubusercontent.com/11559541/144652561-1593db94-2901-43db-aa9c-80616f4eab0f.png)
](https://www.npmjs.com/package/ngx-mat-tui-calendar).

* Material Design theming
* Material Design buttons and dialog
* Responsive to mobile devices
* Dark mode in progress...

This repo contains two projects:
1. the source code for the npm library [`ngx-mat-tui-calendar`](https://www.npmjs.com/package/ngx-mat-tui-calendar), located in `projects/ngx-mat-tui-calendar`
2. the demo app, located in `src`

The top-level `angular.json` and `package.json` files are used for building both projects.

This repo was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.  Angular ^12.2 requires node ^v14.15 (npm ^v6.14).

# Online Demo

https://ngx-mat-tui-calendar-demo.netlify.app/

# UI
## Month View

<img src="https://user-images.githubusercontent.com/11559541/141834376-3f815d1e-7e2b-4f2e-8540-f45303292cfb.png" width="70%" height="70%">

## Week View
<img src="https://user-images.githubusercontent.com/11559541/141834444-89f511c0-8ada-4269-8490-c2864f481bc7.png" width="70%" height="70%">

## Day View
<img src="https://user-images.githubusercontent.com/11559541/141834457-ec741af5-df67-4029-8830-c5b4fd356fff.png" width="70%" height="70%">

## Event Editing Dialog
<img src="https://user-images.githubusercontent.com/11559541/141834468-3b3a81be-c4f5-4d76-8f29-88c193e1adba.JPG" width="70%" height="70%">

# Usage 
## Getting started

Install via npm:
```bash
npm i --save ngx-mat-tui-calendar --legacy-peer-deps
```
which will add `ngx-mat-tui-calendar`, as well as all of its dependencies to your `package.json` file.

Next import the module into your app's ```app.module.ts```:
```typescript
import {NgxMatTuiCalendarModule} from 'ngx-mat-tui-calendar';
```
Then add `NgxMatTuiCalendarModule` to your list of NgModule imports, in ```app.module.ts```

Insert the following HTML into your app's template file
```angular2html
<mat-tui-calendar></mat-tui-calendar>
```
Set up an [Angular theme](https://material.angular.io/guide/theming).  For example add the following line to the top of your `src/styles.scss` file
```typescript
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
```

### Quickstart Repo

A demonstration of the simple usage described above can be found at repo https://github.com/ron2015schmitt/ngx-mat-tui-calendar-quickstart

### Demo Repo

A more extensive demonstration of usage can be found at repo https://github.com/ron2015schmitt/ngx-mat-tui-calendar-demo



# Documentation

## MatTuiCalendar


Selector: `ngx-mat-tui-calendar`

```typescript
  <ngx-mat-tui-calendar #tuiCalendar 
    (userCreatedSchedule)="onUserCreatedSchedule($event)"
    (userUpdatedSchedule)="onUserUpdatedSchedule($event)"
    (userDeletedSchedule)="onUserDeletedSchedule($event)"
    [options]="options"
  >
```

### Properties

| Name | Description |
|------|-------------|
| @Input()
  options: CalendarOptions | The options object for the calendar. | 
| @Output()
  userCreatedSchedule: EventEmitter<ISchedule> | Event emitter that emits when the user creates a new "schedule" (ie calendar task). |
| @Output()
  userUpdatedSchedule: EventEmitter<ISchedule> | Event emitter that emits when the user updates a "schedule" (ie calendar task). |
| @Output()
  userDeletedSchedule: EventEmitter<ISchedule> | Event emitter that emits when the user deletes a "schedule" (ie calendar task). |

  
# Development 

## Getting started

```bash
git clone https://github.com/ron2015schmitt/ngx-mat-tui-calendar
cd ngx-mat-tui-calendar
npm install --legacy-peer-deps
ng build  
ng serve
```
Point your browser to http://localhost:4200/
  
  
## library package for ngx-mat-tui-calendar

The code that makes up the npm package is located in folder ```projects/ngx-mat-tui-calendar```.

After making changes, increment the version in ```projects/ngx-mat-tui-calendar/package.json```.  We use the convention that the major version number corresponds to the major version of Angular used. The minor and patch versions are specific to this package.
  
The top-level `angular.json` file defines the build process for the library.  The top-level `package.json` must include all the peer dependencies in `projects/ngx-mat-tui-calendar/package.json`.  

### API 

The API is defined in ```projects/ngx-mat-tui-calendar/src/public-api.ts```.  

### Build

Run `ng build` to build the library project. The build artifacts will be stored in the `dist/ngx-mat-tui-calendar` directory.

### README

The main README file (`README.md`) and the package README file (`projects/ngx-mat-tui-calendar/README.md`) must be manually kept in sync: if you change one, then copy the change to the other.

### Publish package to https://npmjs.com/

Change directories to the `dist/ngx-mat-tui-calendar` directory and run the following:
```bash
npm login
npm publish
```

### publish source to github

Commit your changes and push to github.com.  Then create a tab and release on github that matches the npm version number.


## Demo App
### Development server

The demo app is defined by the top-level `package.json` file, the top-level `angular.json` file and the contents of the `src` folder.
  
Run `ng serve demo` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  
  
However, if you change the library files, in directory `projects/ngx-mat-tui-calendar`, you need to 
  1. Rebuild the library using `ng build`
  2. Kill the dev server by typing `Ctrl-C` in the terminal where you are running `ng serve demo`
  3. Run `ng serve demo` to restart the dev server

*Step 2 is usually necessary! You will get spurious errors without killing and restarting the server.*


