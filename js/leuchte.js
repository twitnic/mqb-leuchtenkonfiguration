export default class Leuchte {
    constructor(index, name, bytes) {  // Constructor
        let $parts = bytes.match(/[\s\S]{1,2}/g) || [];

        this.index = index;
        this.name = name;
        this.bytes = bytes;
        this.lasttyp = this.getLasttyp($parts[0]);
        this.lampendefektbiposition = $parts[1]; // not hex to dec
        this.reserved = "=RESERVED=";
        this.fehlerort = $parts[3]; // not hex to dec
        this.lichtfunktionA = this.getLichtfunktion($parts[4]);
        this.lichtfunktionB = this.getLichtfunktion($parts[5]);
        this.dimmwertAB = this.getDimmwert($parts[6]);
        this.lichtansteurerungAB = this.getLichtansteuerung($parts[6]);
        this.lichtfunktionC = this.getLichtfunktion($parts[7]);
        this.lichtfunktionD = this.getLichtfunktion($parts[8]);
        this.dimmwertCD = this.getDimmwert($parts[9]);
        this.dimmingdirectionCD = this.getDimmingDirection($parts[9]);
        this.lichtfunktionE = this.getLichtfunktion($parts[10]);
        this.lichtfunktionF = this.getLichtfunktion($parts[11]);
        this.dimmwertEF = this.getDimmwert($parts[12]);
        this.dimmingdirectionEF = this.getDimmingDirection($parts[12]);
        this.lichtfunktionG = this.getLichtfunktion($parts[13]);
        this.lichtfunktionH = this.getLichtfunktion($parts[14]);
        this.dimmwertGH = this.getDimmwert($parts[15]);
        this.dimmingdirectionGH = this.getDimmingDirection($parts[15]);
    }
    getLichtfunktion(bytes) {
        return this.hexToDec(bytes);
    }

    getLasttyp(bytes) {
        return this.hexToDec(bytes);
    }

    getDimmwert(byte) {
        let bin = this.hex2bin(byte);
        let binArray = bin.match(/[\s\S]{1,1}/g) || [];
        let dimmWertBinaer = binArray[1] + '' + binArray[2] + binArray[3] + binArray[4] + binArray[5] + binArray[6] + binArray[7];
        return parseInt(dimmWertBinaer, 2);
    }

    // Lichtansteurerung HD AB
    getLichtansteuerung(byte) {
        let bin = this.hex2bin(byte);
        let binArray = bin.match(/[\s\S]{1,1}/g) || [];
        return parseInt(binArray[0], 2);
    }

    // Dimming direction CD
    // Dimming direction EF
    // Dimming direction GH
    getDimmingDirection(byte) {
        let bin = this.hex2bin(byte);
        let binArray = bin.match(/[\s\S]{1,1}/g) || [];
        return parseInt(binArray[0], 2);
    }

    hexToDec(hex) {
        return parseInt(hex, 16);
    }
    hex2bin(hex){
        return (parseInt(hex, 16).toString(2)).padStart(8, '0');
    }

    bin2hex(number) {
        var hexa = parseInt(number, 2).toString(16).toUpperCase();
        return (hexa < 10 ? '0' : '') + hexa;
    }

    lichtansteuerung = [
        {value: 0, content: "0 - [VO]_always"},
        {value: 1, content: "1 - [VO]_only_if_closed"},
    ];

    dimmingdirection = [
        {value: 0, content: "0 - [VO]_maximize"},
        {value: 1, content: "1 - [VO]_minimize"},
    ];

    lichtfunktiondefinition= [
        {value: 0, content: "0 - [VO]_nicht aktiv"}, // 0
        {value: 1, content: "1 - [VO]_aktiv 100%"}, // 1
        {value: 2, content: "2 - [VO]_Blinken links Hellphase"}, // 2
        {value: 3, content: "3 - [VO]_Blinken links Dunkelphase"}, // 3
        {value: 4, content: "4 - [VO]_Blinken rechts Hellphase"}, // 4
        {value: 5, content: "5 - [VO]_Blinken rechts Dunkelphase"}, // 5
        {value: 6, content: "6 - [VO]_Blinken links aktiv (beide Phasen)"}, // 6
        {value: 7, content: "7 - [VO]_Blinken rechts aktiv (beide Phasen)"}, // 7
        {value: 8, content: "8 - [VO]_Standlicht allgemein (Schlusslicht; Positionslicht; Begrenzungslicht)"}, // 8
        {value: 9, content: "9 - [VO]_Parklicht links (beidseitiges Parklicht aktiviert li & re)"}, // 9
        {value: 10, content: "10 - [VO]_Parklicht rechts"}, // 10
        {value: 11, content: "11 - [VO]_Abblendlicht links"}, // 11
        {value: 12, content: "12 - [VO]_Abblendlicht rechts"}, // 12
        {value: 13, content: "13 - [VO]_Fernlicht links"}, // 13
        {value: 14, content: "14 - [VO]_Fernlicht rechts"}, // 14
        {value: 15, content: "15 - [VO]_Lichthupe generell"}, // 15
        {value: 16, content: "[VO]_Lichthupe bei bereits aktivem Abblendlicht oder bereits aktivem Dauerfahrlicht"}, // 16
        {value: 17, content: "[VO]_Lichthupe bei nicht aktivem Abblendlicht oder bereits aktivem Dauerfahrlicht"}, // 17
        {value: 18, content: "[VO]_Nebellicht links"}, // 18
        {value: 19, content: "[VO]_Nebellicht rechts"}, // 19
        {value: 20, content: "[VO]_Tagfahrlicht"}, // 20
        {value: 21, content: "[VO]_Dauerfahrlicht"}, // 21
        {value: 22, content: "[VO]_Abbiegelichts links"}, // 22
        {value: 23, content: "[VO]_Abbiegelichts rechts"}, // 23
        {value: 24, content: "[VO]_Bremslicht"}, // 24
        {value: 25, content: "[VO]_Rückfahrlicht"}, // 25
        {value: 26, content: "[VO]_Nebelschlusslicht wenn kein Anhaenger gesteckt"}, // 26
        {value: 27, content: "[VO]_Nebelschlusslicht wenn kein Anhaenger gesteckt und Rechtsverkehr"}, // 27
        {value: 28, content: "[VO]_Nebelschlusslicht wenn kein Anhaenger gesteckt und Linksverkehr"}, // 28
        {value: 29, content: "[VO]_Fernlicht über Assistent aktiviert"}, // 29
        {value: 30, content: "[VO]_Coming Home oder Leaving Home aktiv"}, // 30
        {value: 31, content: "[VO]_Standlicht vorn (Positionslicht; Begrenzungslicht)"}, // 31
        {value: 32, content: "[VO]_Nebelschlusslicht auch wenn ein Anhaenger gesteckt"}, // 32
        {value: 33, content: "[VO]_Heckdeckel offen"}, // 33
        {value: 34, content: "[VO]_Heckdeckel geschlossen"}, // 34
        {value: 35, content: "[VO]_CCP-Lichtfunktion: Nach Kl.30-Reset auf 0 initialisiert und ueber CCP aenderbar"}, // 35
        {value: 36, content: "[VO]_Quittierungsfunktion 1"}, // 36
        {value: 37, content: "[VO]_Klemme 30G"}, // 37
        {value: 38, content: "[VO]_Dimmung Klemme 58xs"}, // 38
        {value: 39, content: "[VO]_Dimmung Klemme 58xt"}, // 39
        {value: 40, content: "[VO]_Klemme 15 mit Nachlauf bis Fahrzeugstillstand"}, // 40
        {value: 41, content: "[VO]_Innenlicht"}, // 41
        {value: 42, content: "[VO]_Kofferraumlicht"}, // 42
        {value: 43, content: "[VO]_Fussraumlicht"}, // 43
        {value: 44, content: "[VO]_Ambientelicht 5"}, // 44
        {value: 45, content: "[VO]_Ambientelicht 1"}, // 45
        {value: 46, content: "[VO]_Ambientelicht 2"}, // 46
        {value: 47, content: "[VO]_Ambientelicht 3"}, // 47
        {value: 48, content: "[VO]_Ambientelicht 4"}, // 48
        {value: 49, content: "[VO]_Umfeldbeleuchtung"}, // 49
        {value: 50, content: "[VO]_Tuerausstiegslicht hinten links"}, // 50
        {value: 51, content: "[VO]_Tuerausstiegslicht hinten rechts"}, // 51
        {value: 52, content: "[VO]_Fahrzeug mit Automatik Start-Stopp ist im Stopp-Modu(s)"}, // 52
        {value: 53, content: "[VO]_Klemme 75 Variante a_vfzg"}, // 53
        {value: 54, content: "[VO]_Tuerausstiegslicht vorne links"}, // 54
        {value: 55, content: "[VO]_Tuerausstiegslicht vorne rechts"}, // 55
        {value: 56, content: "[VO]_Tuerausstiegslicht links"}, // 56
        {value: 57, content: "[VO]_Tuerausstiegslicht rechts"}, // 57
        {value: 58, content: "[VO]_beidseitiges Dauerparklicht"}, // 58
        {value: 59, content: "[VO]_Klemme 75 Variante vfzg"}, // 59
        {value: 60, content: "[VO]_Blinken links aktiv (beide Phasen);Auf- und Abdimmend mit p_t_blinken_rampe"}, // 60
        {value: 61, content: "[VO]_Blinken rechts aktiv (beide Phasen); Auf- und Abdimmend mit p_t_blinken_rampe"}, // 61
        {value: 62, content: "[VO]_Schlusslicht aktiv ohne Bremslicht aktiv; ist deaktiviert;wenn Bremslicht aktiv ist !!!"}, // 62
        {value: 63, content: "[VO]_Aktive Blinkfunktion hat ein auf 1 gesetztes zugeordnetes Bit in pa_dynamisch_blinken"}, // 63
        {value: 64, content: "[VO]_Motorraumlicht"}, // 64
        {value: 65, content: "[VO]_Fahrzeug ist nicht fahrbereit (Motor läuft nicht; Elektroantrieb nicht aktiv o.ä.)"}, // 65
        {value: 66, content: "[VO]_Handbremse ist angezogen"}, // 66
        {value: 67, content: "[VO]_Klemme 15 ohne Nachlauf"}, // 67
        {value: 68, content: "[VO]_Debug-Lichtfunktion (in Anlehnung an CCP)"}, // 68
        {value: 69, content: "[VO]_Debug-Lichtfunktion Fehlerspeicher"}, // 69
        {value: 71, content: "[VO]_Versorgungsbedarf der LCM Module"}, // 70
        {value: 72, content: "[VO]_Terminal 58xd dimmer"}, // 71
        {value: 73, content: "[VO]_Zuschaltung Trennrelais für 2. Batterie"}, // 72
        {value: 76, content: "76 - [VO]_nicht_definiert_4C"}, // 72
    ];

    lasttypdefinition = [
        {value: 0, content: "[VO]_0 - nicht aktiv"}, // 0
        {value: 1, content: "[VO]_1 - LED Tagfahrlichtmodul Versorgung"}, // 1
        {value: 2, content: "[VO]_2 - Shutter, Diagnosesensierung für 'LED low'"}, // 2
        {value: 3, content: "[VO]_3 - Xenon Abblendlicht"}, // 3
        {value: 4, content: "[VO]_4 - LED Tagfahrlichtmodul Signal"}, // 4
        {value: 5, content: "[VO]_5 - LED Abblendlicht"}, // 5
        {value: 6, content: "[VO]_6 - LED Lichtmodul"}, // 6
        {value: 7, content: "[VO]_7 - Reserved_07"}, // 7
        {value: 8, content: "[VO]_8 - allgemeine Glühlampe 12W"}, // 8
        {value: 9, content: "[VO]_9 - allgemeine Glühlampe 27W, auch H15"}, // 9
        {value: 10, content: "[VO]_10 - allgemeine Scheinwerfer"}, // 10
        {value: 11, content: "[VO]_11 - Abblendlicht"}, // 11
        {value: 12, content: "[VO]_12 - Blinkleuchten"}, // 12
        {value: 13, content: "[VO]_13 - Bremsleuchten"}, // 13
        {value: 14, content: "[VO]_14 - kombinierte Blink- Bremsleuchten"}, // 14
        {value: 15, content: "[VO]_15 - allgemeine Glühlampe 6W; auch H6W"}, // 15
        {value: 16, content: "[VO]_16 - 2* 3W"}, // 16
        {value: 17, content: "[VO]_17 - 4* 3W"}, // 17
        {value: 18, content: "[VO]_18 - 2* 5W"}, // 18
        {value: 19, content: "[VO]_19 - 3* 5W"}, // 19
        {value: 20, content: "[VO]_20 - 4* 5W"}, // 20
        {value: 21, content: "[VO]_21 - 2* 13W Blinker"}, // 21
        {value: 22, content: "[VO]_22 - 2* 16W Blinker"}, // 22
        {value: 23, content: "[VO]_23 - allgemeine Scheinwerfer"}, // 23
        {value: 24, content: "[VO]_24 - 2* 5W KZL + LED Sidemarker"}, // 24
        {value: 25, content: "[VO]_25 - allgemeine Glühlampe innen- oder Außenlicht"}, // 25
        {value: 26, content: "[VO]_26 - ---"}, // 26
        {value: 27, content: "[VO]_27 - ---"}, // 27
        {value: 28, content: "[VO]_28 - ---"}, // 28
        {value: 29, content: "[VO]_29 - ---"}, // 29
        {value: 30, content: "[VO]_30 - ---"}, // 30
        {value: 31, content: "[VO]_31 - ---"}, // 31
        {value: 32, content: "[VO]_32 - allgemeine LED bis 12W"}, // 32
        {value: 33, content: "[VO]_33 - LED-Modul Blinkleuchten"}, // 33
        {value: 34, content: "[VO]_34 - LED Bremsleuchten"}, // 34
        {value: 35, content: "[VO]_35 - kombinierte LED Blink-Bremsleuchten"}, // 35
        {value: 36, content: "[VO]_36 - LED Kleinleistung"}, // 36
        {value: 37, content: "[VO]_37 - allgemeine LED bis 12W"}, // 37
        {value: 38, content: "[VO]_38 - LED Blinkleuchten"}, // 38
        {value: 39, content: "[VO]_39 - LED Bremsleuchten"}, // 39
        {value: 40, content: "[VO]_40 - allgemeine LED"}, // 40
        {value: 41, content: "[VO]_41 - LED Kleinleistung"}, // 41
        {value: 42, content: "[VO]_42 - LED dritte Bremsleuchte"}, // 42
        {value: 43, content: "[VO]_43 - allgemeine LED"}, // 43
        {value: 44, content: "[VO]_44 - LED Fußraum- oder -Innenleuchte"}, // 44
        {value: 45, content: "[VO]_45 - allgemeine LED bis 6W"}, // 45
        {value: 46, content: "[VO]_46 - LED Kleinleistung"}, // 46
        {value: 47, content: "[VO]_47 - LED Kleinleistung"}, // 46
        {value: 48, content: "[VO]_Reserved_48"}, // 46
    ];
}
