
![ngx-mat-tui-calendar](https://user-images.githubusercontent.com/11559541/141514000-da6e6c8a-e00b-4f27-a8c2-b7f28538b2f0.png)

[![Development Status](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/ron2015schmitt/ngx-mat-tui-calendar.svg)](https://github.com/ron2015schmitt/ngx-mat-tui-calendar/stargazers)
![GitHub downloads all releases](https://img.shields.io/github/downloads/ron2015schmitt/ngx-mat-tui-calendar/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ron2015schmitt/ngx-mat-tui-calendar)

![npm](https://img.shields.io/npm/v/ngx-mat-tui-calendar?label=npm%20package)
![npm downloads](https://img.shields.io/npm/dt/ngx-mat-tui-calendar?label=npm%20downloads)

# ngx-mat-tui-calendar

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `Work In Progress`
This project is an Angular, Material Design wrapper for the [Toast UI Calendar](https://github.com/nhn/tui.calendar).
* Material Design theming
* Material Design buttons and dialog
* Responsive to mobile devices
* Dark mode in progress...

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

Using Angular 12 which requires node ^v14.15 (npm ^v6.14)

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
npm i --save ngx-mat-tui-calendar
```
Next import the module into your app's ```app.module.ts```:
```typescript
import {NgxMatTuiCalendarModule} from 'ngx-mat-tui-calendar';

@NgModule({
  imports: [NgxMatTuiCalendarModule]
})

```

Insert the following HTML into one of your app's template files
```angular2html
<mat-tui-calendar></mat-tui-calendar>
```

## Demo Project

## Stackblitz

# Documentation

## MatTuiCalendar

Directive responsible for managing the timepicker popup and setting value to input

Selector: `mat-tui-calendar`

```typescript
  <mat-tui-calendar #tuiCalendar 
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
  ngxMatTimepicker: NgxMatTimepickerComponent | The timepicker that this input is associated with. |
| @Input()
  color: ThemePalette | The material palette to use. | 
| @Input()
  disabled: boolean | Weather the timepicker popup should be disabled. |
| @Input()
  value: string | Set a default value and time for a timepicker. The format of the time is in 12 hours notation `11:00 PM` or in 24 hours notation `23:00`. A Date string won't work. |
| @Input()
  format: number | `12` or `24` . 12h/24h view for hour selection clock . `12` (AM/PM) format by default. |
| @Input()
  min: string or DateTime | Set min time for timepicker (`11:15 pm` ) |
| @Input()
  max: string or DateTime | Set max time for timepicker (`11:15 pm` ) |
| @Input()
  disableClick: boolean | Set `true` to disable opening timepicker by clicking on the input |

  
# Development 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
