export default class Leuchte {
    constructor(index, name, bytes) {  // Constructor
        let $parts = bytes.match(/[\s\S]{1,2}/g) || [];

        this.index = index;
        this.name = name;
        this.bytes = bytes;
        this.lasttyp = this.getLasttyp($parts[0]);
        this.lampendefektbiposition = this.hexToDec($parts[1])
        this.reserved = "=RESERVED=";
        this.fehlerort = this.hexToDec($parts[3]);
        this.lichtfunktionA = this.getLichtfunktion($parts[4]);
        this.lichtfunktionB = this.getLichtfunktion($parts[5]);
        this.dimmwertab = this.getDimmwert($parts[6]);
        this.lichtansteurerungab = this.getLichtansteuerung($parts[6]);
        this.lichtfunktionC = this.getLichtfunktion($parts[7]);
        this.lichtfunktionD = this.getLichtfunktion($parts[8]);
        this.dimmwertcd = this.getDimmwert($parts[9]);
        this.lichtansteurerungcd = this.getLichtansteuerung($parts[9]);
        this.lichtfunktionE = this.getLichtfunktion($parts[10]);
        this.lichtfunktionF = this.getLichtfunktion($parts[11]);
        this.dimmwertef = this.getDimmwert($parts[12]);
        this.lichtansteurerungef = this.getLichtansteuerung($parts[12]);
        this.lichtfunktionG = this.getLichtfunktion($parts[13]);
        this.lichtfunktionH = this.getLichtfunktion($parts[14]);
        this.dimmwertgh = this.getDimmwert($parts[15]);
        this.lichtansteurerunggh = this.getLichtansteuerung($parts[15]);
    }
    getLichtfunktion(bytes) {
        return this.lichtfunktiondefinition[this.hexToDec(bytes)];
    }

    getLasttyp(bytes) {
        let decimal = this.hexToDec(bytes);
        return "[VO]_" + decimal + " - " + this.lasttypdefinition[decimal];
    }

    getDimmwert(bytes) {
        return this.lasttypdefinition[this.hexToDec(bytes)];
    }

    getLichtansteuerung(bytes) {
        return this.lasttypdefinition[this.hexToDec(bytes)];
    }

    hexToDec(hex) {
        return parseInt(hex, 16);
    }
    hex2bin(hex) {
        return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
    }
    bin2hex(number) {
        var hexa = parseInt(number, 2).toString(16).toUpperCase();
        return (hexa < 10 ? '0' : '') + hexa;
    }

    // You can create a constant array:
    lichtfunktiondefinition= [72];
    lichtfunktiondefinition= [
        "nicht aktiv", // 0
        "aktiv 100%", // 1
        "Blinken links Hellphase", // 2
        "Blinken links Dunkelphase", // 3
        "Blinken rechts Hellphase", // 4
        "Blinken rechts Dunkelphase", // 5
        "Blinken links aktiv (beide Phasen)", // 6
        "Blinken rechts aktiv (beide Phasen)", // 7
        "Standlicht allgemein (Schlusslicht; Positionslicht; Begrenzungslicht)", // 8
        "Parklicht links (beidseitiges Parklicht aktiviert li & re)", // 9
        "Parklicht rechts", // 10
        "Abblendlicht links", // 11
        "Abblendlicht rechts", // 12
        "Fernlicht links", // 13
        "Fernlicht rechts", // 14
        "Lichthupe generell", // 15
        "Lichthupe bei bereits aktivem Abblendlicht oder bereits aktivem Dauerfahrlicht", // 16
        "Lichthupe bei nicht aktivem Abblendlicht oder bereits aktivem Dauerfahrlicht", // 17
        "Nebellicht links", // 18
        "Nebellicht rechts", // 19
        "Tagfahrlicht", // 20
        "Dauerfahrlicht", // 21
        "Abbiegelichts links", // 22
        "Abbiegelichts rechts", // 23
        "Bremslicht", // 24
        "Rückfahrlicht", // 25
        "Nebelschlusslicht wenn kein Anhaenger gesteckt", // 26
        "Nebelschlusslicht wenn kein Anhaenger gesteckt und Rechtsverkehr", // 27
        "Nebelschlusslicht wenn kein Anhaenger gesteckt und Linksverkehr", // 28
        "Fernlicht über Assistent aktiviert", // 29
        "Coming Home oder Leaving Home aktiv", // 30
        "Standlicht vorn (Positionslicht; Begrenzungslicht)", // 31
        "Nebelschlusslicht auch wenn ein Anhaenger gesteckt", // 32
        "Heckdeckel offen", // 33
        "Heckdeckel geschlossen", // 34
        "CCP-Lichtfunktion: Nach Kl.30-Reset auf 0 initialisiert und ueber CCP aenderbar", // 35
        "Quittierungsfunktion 1", // 36
        "Klemme 30G", // 37
        "Dimmung Klemme 58xs", // 38
        "Dimmung Klemme 58xt", // 39
        "Klemme 15 mit Nachlauf bis Fahrzeugstillstand", // 40
        "Innenlicht", // 41
        "Kofferraumlicht", // 42
        "Fussraumlicht", // 43
        "Ambientelicht 5", // 44
        "Ambientelicht 1", // 45
        "Ambientelicht 2", // 46
        "Ambientelicht 3", // 47
        "Ambientelicht 4", // 48
        "Umfeldbeleuchtung", // 49
        "Tuerausstiegslicht hinten links", // 50
        "Tuerausstiegslicht hinten rechts", // 51
        "Fahrzeug mit Automatik Start-Stopp ist im Stopp-Modu(s)", // 52
        "Klemme 75 Variante a_vfzg", // 53
        "Tuerausstiegslicht vorne links", // 54
        "Tuerausstiegslicht vorne rechts", // 55
        "Tuerausstiegslicht links", // 56
        "Tuerausstiegslicht rechts", // 57
        "beidseitiges Dauerparklicht", // 58
        "Klemme 75 Variante vfzg", // 59
        "Blinken links aktiv (beide Phasen);Auf- und Abdimmend mit p_t_blinken_rampe", // 60
        "Blinken rechts aktiv (beide Phasen); Auf- und Abdimmend mit p_t_blinken_rampe", // 61
        "Schlusslicht aktiv ohne Bremslicht aktiv; ist deaktiviert;wenn Bremslicht aktiv ist !!!", // 62
        "Aktive Blinkfunktion hat ein auf 1 gesetztes zugeordnetes Bit in pa_dynamisch_blinken", // 63
        "Motorraumlicht", // 64
        "Fahrzeug ist nicht fahrbereit (Motor läuft nicht; Elektroantrieb nicht aktiv o.ä.)", // 65
        "Handbremse ist angezogen", // 66
        "Klemme 15 ohne Nachlauf", // 67
        "Debug-Lichtfunktion (in Anlehnung an CCP)", // 68
        "Debug-Lichtfunktion Fehlerspeicher", // 69
        "Versorgungsbedarf der LCM Module", // 70
        "Terminal 58xd dimmer", // 71
        "Zuschaltung Trennrelais für 2. Batterie", // 72
    ];

    lasttypdefinition = [46];
    lasttypdefinition = [
        "nicht aktiv", // 0
        "LED Tagfahrlichtmodul Versorgung", // 1
        "Shutter; Diagnosesensierung für \"LED low\"", // 2
        "Xenon Abblendlicht", // 3
        "LED Tagfahrlichtmodul Signal", // 4
        "LED Abblendlicht", // 5
        "LED Lichtmodul", // 6
        "Reserved_07", // 7
        "allgemeine Glühlampe 12W", // 8
        "allgemeine Glühlampe 27W; auch H15", // 9
        "allgemeine Scheinwerfer", // 10
        "Abblendlicht", // 11
        "Blinkleuchten", // 12
        "Bremsleuchten", // 13
        "kombinierte Blink- Bremsleuchten", // 14
        "allgemeine Glühlampe 6W; auch H6W", // 15
        "2* 3W", // 16
        "4* 3W", // 17
        "2* 5W", // 18
        "3* 5W", // 19
        "4* 5W", // 20
        "2* 13W Blinker", // 21
        "2* 16W Blinker", // 22
        "allgemeine Scheinwerfer", // 23
        "2* 5W KZL + LED Sidemarker", // 24
        "allgemeine Glühlampe innen- oder Außenlicht", // 25
        "---", // 26
        "---", // 27
        "---", // 28
        "---", // 29
        "---", // 30
        "---", // 31
        "allgemeine LED bis 12W", // 32
        "LED-Modul Blinkleuchten", // 33
        "LED Bremsleuchten", // 34
        "kombinierte LED Blink-Bremsleuchten", // 35
        "LED Kleinleistung", // 36
        "allgemeine LED bis 12W", // 37
        "LED Blinkleuchten", // 38
        "LED Bremsleuchten", // 39
        "allgemeine LED", // 40
        "LED Kleinleistung", // 41
        "LED dritte Bremsleuchte", // 42
        "allgemeine LED", // 43
        "LED Fußraum- oder -Innenleuchte", // 44
        "allgemeine LED bis 6W", // 45
        "LED Kleinleistung", // 46
    ];
}
