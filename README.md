# Page Constructor

## Description

Simple page builder with 3 types of sections:

- Text, which contains title and description;
- Cards, which contains cards with icon, title and description;
- Pokemons, which contains cards with pokemons, button to load more and text field to filter them.

## Demo

[Live Demo](https://leendrew.github.io/page-constructor)

## Features

- Switch between View and Edit modes
- Add new Section
- Delete Section
- Synchronize Sections state to local storage
- Text Section:
  - On Edit mode:
    - Change title or description
- Cards Section:
  - On Edit mode:
    - Change icon, title or description of each card
    - Delete card
    - Move cards between each other and other cards sections
- Pokemons Section:
  - On Edit mode:
    - Load 5 more pokemons
    - Filter them by name using text input
    - Move cards between each other and other cards sections

## Stack

- TypeScript
- Vue 2.7 Options API
- Vite
- Vuex
- Vuetify
- Vuedraggable
