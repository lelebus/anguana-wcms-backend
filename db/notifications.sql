
INSERT INTO notifications (key, language, text) VALUES
    ('today', 'IT', 'oggi'),
    ('today', 'DE', 'heute'),
    ('tomorrow', 'IT', 'domani'),
    ('tomorrow', 'DE', 'morgen'),
    ('monday', 'IT', 'lunedì'),
    ('monday', 'DE', 'Montag'),
    ('tuesday', 'IT', 'martedì'),
    ('tuesday', 'DE', 'Dienstag'),
    ('wednesday', 'IT', 'mercoledì'),
    ('wednesday', 'DE', 'Mittwoch'),
    ('thursday', 'IT', 'giovedì'),
    ('thursday', 'DE', 'Donnerstag'),
    ('friday', 'IT', 'venerdì'),
    ('friday', 'DE', 'Freitag'),
    ('saturday', 'IT', 'sabato'),
    ('saturday', 'DE', 'Samstag'),
    ('sunday', 'IT', 'domenica'),
    ('sunday', 'DE', 'Sonntag');


INSERT INTO notifications (key, language, text) VALUES
    ('token', 'IT', 'Ciao, utilizza %TOKEN% per accedere a trettl.it'),
    ('token', 'DE', 'Hallo, benutze %TOKEN%, um bei trettl.it einzuloggen');

INSERT INTO notifications (key, language, text) VALUES
    ('shipping_details', 'IT', 'Ciao %NAME%, il tuo ordine è stato pesato e preparato! %NEWLINE% %NEWLINE%L''importo finale da pagare è di € %PRICE%. %NEWLINE% %NEWLINE%Il tuo ordine verrà consegnato %DATE%. La consegna avverrà tra le %STARTTIME% e le %ENDTIME%; ti chiameremo 15 minuti prima per assicurarci di trovarti a casa. %NEWLINE%Potrai pagare in contanti o con carta. %NEWLINE% %NEWLINE%Niki & Harry'),
    ('shipping_details', 'DE', 'Hallo %NAME%, deine Bestellung wurde gewogen und vorbereitet! %NEWLINE% %NEWLINE%Der endgültige Betrag beträgt € %PRICE%. %NEWLINE% %NEWLINE%Deine Bestellung wird %DATE% geliefert werden. Die Lieferung der Ware erfolgt zwischen %STARTTIME% und %ENDTIME% Uhr, wobei wir dich 15 Minuten vorher telefonisch kontaktieren werden, um sicher zu stellen, dass du zu Hause bist. %NEWLINE%Du kannst in bar oder mit Karte bezahlen. %NEWLINE% %NEWLINE%Niki & Harry');


