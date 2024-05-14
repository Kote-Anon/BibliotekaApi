# Dokumentacja techniczna API w Node.js z wykorzystaniem MySQL

## Wstęp
Dokumentacja ta opisuje API napisane w języku JavaScript przy użyciu środowiska Node.js oraz bazy danych MySQL. API umożliwia interakcję z bazą danych poprzez HTTP zapytania.

## Instalacja i uruchomienie
1. *Wymagania*: Node.js, MySQL.
2. *Klonowanie repozytorium*: Sklonuj repozytorium z API.
3. *Instalacja zależności*: W katalogu projektu wykonaj polecenie npm install.
4. *Konfiguracja bazy danych*: Skonfiguruj połączenie z bazą danych MySQL w pliku konfiguracyjnym.
5. *Uruchomienie*: Uruchom serwer poprzez polecenie npm start.

## Konfiguracja bazy danych
W pliku config.js znajdują się ustawienia dotyczące połączenia z bazą danych MySQL, takie jak nazwa użytkownika, hasło, host oraz nazwa bazy danych. Upewnij się, że wprowadzone dane są zgodne z ustawieniami Twojej bazy danych.

module.exports = {
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASSWORD: 'password',
  DB_DATABASE: 'database_name'
};

## Obsługiwane endpointy

### 1. Pobranie wszystkich danych
*Metoda:* GET  
*Endpoint:* /api/data  
*Opis:* Pobiera wszystkie dane z bazy danych.  
*Odpowiedź sukcesu:* Kod stanu HTTP 200 z listą danych w formacie JSON.  
*Odpowiedź błędu:* Kod stanu HTTP 500 w przypadku błędu serwera.

### 2. Dodanie nowych danych
*Metoda:* POST  
*Endpoint:* /api/data  
*Opis:* Dodaje nowe dane do bazy danych.  
*Ciało zapytania:* Dane do dodania w formacie JSON.  
*Odpowiedź sukcesu:* Kod stanu HTTP 201 z potwierdzeniem dodania danych w formacie JSON.  
*Odpowiedź błędu:* Kod stanu HTTP 400 w przypadku nieprawidłowych danych, kod stanu HTTP 500 w przypadku błędu serwera.

### 3. Aktualizacja danych
*Metoda:* PUT  
*Endpoint:* /api/data/:id  
*Opis:* Aktualizuje istniejące dane na podstawie identyfikatora.  
*Parametr ścieżki:* id - Identyfikator danych do zaktualizowania.  
*Ciało zapytania:* Zaktualizowane dane w formacie JSON.  
*Odpowiedź sukcesu:* Kod stanu HTTP 200 z potwierdzeniem aktualizacji w formacie JSON.  
*Odpowiedź błędu:* Kod stanu HTTP 400 w przypadku nieprawidłowych danych, kod stanu HTTP 404 w przypadku nieznalezienia danych, kod stanu HTTP 500 w przypadku błędu serwera.

### 4. Usunięcie danych
*Metoda:* DELETE  
*Endpoint:* /api/data/:id  
*Opis:* Usuwa istniejące dane na podstawie identyfikatora.  
*Parametr ścieżki:* id - Identyfikator danych do usunięcia.  
*Odpowiedź sukcesu:* Kod stanu HTTP 200 z potwierdzeniem usunięcia w formacie JSON.  
*Odpowiedź błędu:* Kod stanu HTTP 404 w przypadku nieznalezienia danych, kod stanu HTTP 500 w przypadku błędu serwera.

## Przykładowe zapytania i odpowiedzi
### Pobranie wszystkich danych
*Zapytanie:*
GET /api/data
*Odpowiedź:*
[
  {
    "id": 1,
    "name": "Example",
    "value": 10
  },
  {
    "id": 2,
    "name": "Another Example",
    "value": 20
  }
]

### Dodanie nowych danych
*Zapytanie:*
POST /api/data
*Ciało zapytania:*
{
  "name": "New Data",
  "value": 30
}
*Odpowiedź:*
{
  "message": "Data added successfully",
  "data": {
    "id": 3,
    "name": "New Data",
    "value": 30
  }
}

## Podsumowanie
API w Node.js z wykorzystaniem MySQL zapewnia prostą interakcję z bazą danych poprzez standardowe metody HTTP. Korzystając z odpowiednich endpointów, można wykonywać operacje CRUD (tworzenie, odczyt, aktualizacja, usuwanie danych) w aplikacjach internetowych oraz mobilnych.
