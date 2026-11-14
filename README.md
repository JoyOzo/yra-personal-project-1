# YRA Corporate Web Application

A responsive Angular frontend for Young Researcher Academy (YRA), built from the provided design reference as Personal Project 1 for the Seamfix NextGen Academy Angular training.

Live demo: <yra-personal-project-1.netlify.app>
Repository: https://github.com/JoyOzo/yra-personal-project-1

## Features

- Pages: Home, About, Programmes, Resources, Events, Media, Opportunities, Community, Admin, Login and Join Us
- Registration and login with session persistence (localStorage for "Remember me", otherwise sessionStorage)
- Route guard protecting **Resources** and **Media**; unauthenticated users are redirected to Login and returned to their page after signing in
- Resource search and filters, event registration dialog, programme filters
- Success, error and info notifications with MatSnackBar; loading states with MatProgressSpinner
- Responsive layout for desktop, tablet and mobile

## Technologies

Angular 22 (standalone components, new control flow), Angular Signals and Signal Forms, NgRx (Store, Effects, Store Devtools), Angular Material (Snackbar, Progress Spinner, Dialog), RxJS, custom CSS, TypeScript.

## Angular concepts demonstrated

| Concept | Where |
|---|---|
| Components, templates, data binding | Every page; `[(ngModel)]` search on Resources |
| Structural / attribute directives | `@if`, `@for`, `@switch`; custom `appHoverLift` directive |
| Pipes | Built-in `currency`, `uppercase`; custom `eventDate` pipe |
| Services and DI | `AuthService`, `ResourceService`, `EventService`, `NotificationService` |
| Signals | Component state, `computed()`, signal inputs/outputs |
| Component communication | `input()` / `output()` (page header, filter tabs), `@Input()` / `@Output()` (card) |
| NgRx | `auth`, `resources` and `events` slices with actions, reducers, selectors and effects |
| Routing | Eager Login and Join Us; lazy-loaded feature pages; `PreloadAllModules` |
| Guards | Functional `authGuard` on Resources and Media |
| Forms | Angular Signal Forms with validation errors shown only in snackbars |

## Architecture

Feature-based folders with a smart / presentational component pattern: pages fetch data and decide behaviour, while shared components (`Card`, `PageHeader`, `FilterTabs`) only display data and emit events. State follows the Redux pattern** through NgRx. 


## Run locally

bash
git clone https://github.com/JoyOzo/yra-personal-project-1.git
cd yra-personal-project-1
npm install
ng serve


Open http://localhost:4200. Accounts are stored in the browser, so use **Join YRA → Create membership** to register first, then log in.

## Notes

This is a frontend-only demo: users, resources and events are simulated in services and the browser's storage, and no passwords should be reused.