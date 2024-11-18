
# appointment-system
System umawiania wizyt ekipy budowlanej


	1. Co robi ten projekt?

Projekt to system do zarządzania wizytami ekipy budowlanej, specjalizującej się w montażu okien i drzwi.
Składa się z dwóch głównych części: formularza dla klientów i panelu administratora.
Jego celem jest ułatwienie zarządzania wizytami, planowania harmonogramu oraz wysyłania potwierdzeń i przypomnień e-mailowych.	

	2. Dlaczego ten projekt jest użyteczny?
Projekt ten jest użyteczny, ponieważ rozwiązuje kilka kluczowych problemów i usprawnia procesy związane z zarządzaniem wizytami w firmach usługowych,
takich jak montaż okien i drzwi.


	3. Import bazy danych appointment-system:

Uruchom XAMPP, włącz moduł Apache i MySQL.

Utwórz folder o nazwie 'appointment-system' w folderze htdocs znajdującym się w głownym folderze Xampp.

Otwórz phpMyAdmin: W przeglądarce internetowej przejdź pod adres http://localhost/phpmyadmin.

Utwórz nową bazę danych:

W phpMyAdmin kliknij opcję "New" (Nowa) po lewej stronie.
Wprowadź nazwę bazy danych jako appointment-system.
Wybierz kodowanie znaków utf8_general_ci i kliknij "Create" (Utwórz).
Przejdź do sekcji "Import": Po utworzeniu bazy danych, kliknij jej nazwę w menu po lewej stronie, a następnie wybierz zakładkę "Import" w górnym menu.

Wskaż plik SQL do importu. Plik znajduje się w folderze 'database' --> appointment_system.sql

Kliknij przycisk "Choose File" (Wybierz plik) i wybierz plik 'appointment-system.sql'.
Rozpocznij import.

Po wybraniu pliku upewnij się, że opcja "Format" jest ustawiona na SQL.
Kliknij "Go" (Wykonaj), aby zaimportować bazę danych.
Potwierdzenie powodzenia operacji: Jeśli import zakończy się sukcesem, phpMyAdmin wyświetli komunikat o powodzeniu. Wszystkie tabele i dane z pliku SQL zostaną zaimportowane do bazy danych appointment-system.

Testowanie bazy danych:

Przejdź do zakładki "Structure", aby upewnić się, że tabele zostały zaimportowane.
Możesz także przeglądać dane w zakładce "Browse" (Przeglądaj) dla każdej tabeli.


	4. Kroki instalacji i uruchomienia projektu:

Pobierz projekt z repozytorium.
Otwórz terminal i przejdź do głównego katalogu projektu. Ścieżka powinna wyglądać następująco: 'C:\...\XAMPP\htdocs\appointment-system'. Otwórz plik '.env' i zmodyfikuj podane linie aby dostosować SMTP pod swoją pocztę:

	MAIL_MAILER=smtp
	MAIL_HOST=sandbox.smtp.mailtrap.io
	MAIL_PORT=587
	MAIL_USERNAME='Twoj_email'
	MAIL_PASSWORD='Twoje_haslo SMTP'
	MAIL_ENCRYPTION=null
	MAIL_FROM_ADDRESS=no-reply@example.com
	MAIL_FROM_NAME="System Wizyta"
	//Na przykładzie mailtrap

oraz plik mailservice.php - ścieżka do pliku: C:...\XAMPP\htdocs\appointment-system\app\Services

  	// Konfiguracja SMTP
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io'; // Host Mailtrap
        $mail->SMTPAuth = true;
        $mail->Username = 'Twoj_email'; // Username z Mailtrap
        $mail->Password = 'Twoje_haslo SMTP'; // Password z Mailtrap
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

Następnie wciśnij pasek adresu głównego folderu projektu 'appointment-system' i wpisz cmd. Tym sposobem otworzysz cmd ze ścieżką wskazującą folder 'appointment-system'.
Wpisz komendę: 'START /B php artisan serve'. Dzięki temu serwer deweloperski Laravel jest uruchomiony w tle (system Windows).
Następnie wpisz :'cd frontend' - służy do przejścia do katalogu o nazwie frontend. Kolejno komenda 'npm start' - w aplikacji React uruchamia serwer deweloperski (Webpack Dev Server). Po wykonaniu poprzednich kroków nastąpi otwiercie
aplikacji w domyślnej przeglądarce pod adresem http://localhost:3000. Jeśli wszystko wykonałeś poprawnie twoim oczom ukaże się strona z formularzem. Od tego momentu możesz używać aplikacji.
	
	5. Panel administratora:

Po wciśnięciu przycisku 'Przejdź do panelu administratora' zostaniesz przekierowany do okna logowania. Login - 'admin', hasło - 'admin'. Po zalogowaniu ukaże się kalendarz zaplanowanych wizyt.

	6. Użyte oraz wymagane frameworki:

	Frontend:

React: Framework JavaScript do budowy interfejsu użytkownika.
React Router: Obsługa routingu i nawigacji między stronami.
FullCalendar: Wyświetlanie kalendarza.

	Plugins:
	-@fullcalendar/react
	-@fullcalendar/daygrid
	-@fullcalendar/interaction
Axios: Komunikacja HTTP między frontendem a backendem.
Bootstrap: Stylizacja aplikacji i zapewnienie responsywności.
Custom CSS: Własne style dla specyficznych elementów aplikacji.

	Backend:
PHP
Laravel: Framework PHP do obsługi backendu i logiki aplikacji.
PHPMailer: Wysyłanie e-maili (np. potwierdzenia wizyt, przypomnienia).
Carbon: Obsługa dat i czasu.
Illuminate\Database: Operacje na bazie danych w Laravelu.

	Baza danych:

MariaDB/MySQL: Relacyjna baza danych do przechowywania danych aplikacji.

	Dev Tools:

XAMPP: Lokalny serwer dla Apache i MySQL.
Node.js: Środowisko JavaScript do uruchamiania aplikacji frontendowej.
Composer: Menedżer pakietów dla PHP.
npm: Menedżer pakietów dla JavaScript.
dotenv: Obsługa zmiennych środowiskowych (np. dane bazy, SMTP).
Mailtrap: Testowy serwer SMTP dla e-maili.
	
	Inne technologie:

Flexbox i CSS Grid: Do układania elementów interfejsu.
Media Queries: Zapewnienie responsywności na różnych urządzeniach.
Postman (opcjonalnie): Testowanie API backendu.




## **Wymagania**
- Node.js 18+
- PHP 8.0+
- Composer 2+
- MySQL/MariaDB
- Git

## **Logowanie administratora**
- Login: `admin`
- Hasło: `admin`






>>>>>>> 649d044d6384618f66abd2881687145f98732ade
