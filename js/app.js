import Leuchte from './leuchte.js';
(function ($) {
    $.ajaxSetup ({
        // Disable caching of AJAX responses
        cache: false
    });

    $(document).ready(function () {
        $('#textareaVorn').change(function () {
            if ($.trim($('#textareaVorn').val())) {
                generateFrontOutput();
            }
        });

        $('#textareaHeck').change(function () {
            if ($.trim($('#textareaHeck').val())) {
                generateHeckOutput();
            }
        });

        $('#textareaSonstiges').change(function () {
            if ($.trim($('#textareaSonstiges').val())) {
                generateSonstigesOutput();
            }
        });

        $("#demodaten").click(function () {
            $("#textareaVorn").html('21 34 00 14 02 00 7F 03 00 00 00 00 00 00 00 00 21 3E 00 15 04 00 7F 05 00 00 00 00 00 00 00 00 04 48 00 4A 08 09 23 1E 14 64 00 06 A3 00 00 00 04 4C 00 4C 08 0A 23 1E 14 64 00 07 A3 00 00 00 01 48 00 49 14 1E 7F 08 09 7F 00 00 00 00 00 00 01 4C 00 4B 14 1E 7F 08 0A 7F 00 00 00 00 00 00 05 49 00 1A 0B 00 7F 0F 00 7F 1E 00 7F 00 00 00 05 4D 00 1B 0C 00 7F 0F 00 7F 1E 00 7F 00 00 00 06 37 00 1C 0D 0F 7F 00 00 00 00 00 00 00 00 00 06 41 00 1D 0E 0F 7F 00 00 00 00 00 00 00 00 00 02 52 00 55 0D 0F 64 0B 1E 64 00 00 00 00 00 00 02 53 00 56 0E 0F 64 0C 1E 64 00 00 00 00 00 00 0A 38 00 22 12 16 64 00 00 00 00 00 00 00 00 00 0A 42 00 23 13 17 64 00 00 00 00 00 00 00 00 00').trigger('change');
            $("#textareaHeck").html('0C 08 00 16 02 00 64 03 00 00 00 00 00 00 00 00 0C 18 00 18 04 00 64 05 00 00 00 00 00 00 00 00 27 09 00 2B 18 00 7F 00 00 00 00 00 00 00 00 00 27 19 00 2D 18 00 7F 00 00 00 00 00 00 00 00 00 2A 00 00 2C 18 00 64 00 00 00 00 00 00 00 00 00 25 10 00 29 08 09 7F 1E 00 7F 00 00 00 00 00 00 25 20 00 2A 08 0A 7F 1E 00 7F 00 00 00 00 00 00 2B 28 00 30 08 1E 7F 00 00 00 00 00 00 00 00 00 25 0A 00 35 08 09 FF 1E 00 7F 00 00 00 00 00 00 25 1A 00 36 08 0A FF 1E 00 7F 00 00 00 00 00 00 09 0C 00 33 1A 00 E4 00 00 00 00 00 00 00 00 00 09 1B 00 34 19 00 E4 00 00 00 00 00 00 00 00 00').trigger('change');
            $("#textareaSonstiges").html('00 08 00 41 02 00 FF 03 00 80 00 00 00 00 00 00 30 18 00 42 04 00 FF 05 00 80 00 00 00 00 00 00 2E 00 00 02 2B 00 64 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 29 00 00 06 4C 00 64 00 00 00 00 00 00 00 00 00').trigger('change');
        });
    });

    // Set our data for the post
    const leuchtenVornName =
        {
            0: 'BLK VL B36', // 0
            1: 'BLK VRB20', // 1
            2: 'SL VLB10', // 2
            3: 'SL VRB21', // 3
            4: 'TFL LB4', // 4
            5: 'TFL RB32', // 5
            6: 'ABL LC5', // 6
            7: 'ABL RB1', // 7
            8: 'FL LB39', // 8
            9: 'FL RB2', // 9
            10: 'SHUTTER LB23', // 10
            11: 'SHUTTER RB22', // 11
            12: 'NL LB45', // 12
            13: 'NL RB5' // 13
        };

    const leuchtenHeckName =
        {
            18: 'BLK HLA60', // 18
            19: 'BLK HRC31', // 19
            20: 'BR LA71', // 20
            21: 'BR RC8', // 21
            22: 'BR MA57', // 22
            23: 'SL HLC10', // 23
            24: 'SL HRA65', // 24
            25: 'KZL HA59', // 25
            26: 'NSL LA72', // 26
            27: 'NSL RC6', // 27
            28: 'RFL LC11', // 28
            29: 'RFL RA64' // 29
        };

    const leuchtenSonstigesName =
        {
            16: 'BLK SLB35BLK SL KC9', // 16
            17: 'TFL R BLK SRB3TFL R BLK SR KC3', // 17
            30: 'FR LC72', // 30
            31: 'AMBL 1C61', // 31
            32: 'AMBL 2C35', // 32
            33: 'AMBL 3C36', // 33
            34: 'AMBL 4C37', // 34
            35: 'LED Warnblinktaster C48', // 35
        };


    function generateFrontOutput() {
        let $textAreaFrontMitWhitespace = $.trim($('#textareaVorn').val());
        let $textAreaFront = $textAreaFrontMitWhitespace.replace(/\s/g, "");
        let $frontBytes = $textAreaFront.match(/[\s\S]{1,2}/g) || [];

        let leuchtenFront = [];
        let bit = 0;
        for(let key in leuchtenVornName) {
            leuchtenFront[key] = new Leuchte(
                key,
                leuchtenVornName[key],
                $frontBytes[bit] + "" + $frontBytes[bit+1] + $frontBytes[bit+2] + $frontBytes[bit+3] + $frontBytes[bit+4] + $frontBytes[bit+5] + $frontBytes[bit+6] + $frontBytes[bit+7] + $frontBytes[bit+8] + $frontBytes[bit+9] + $frontBytes[bit+10] + $frontBytes[bit+11] + $frontBytes[bit+12] + $frontBytes[bit+13] + $frontBytes[bit+14] + $frontBytes[bit+15]
            );
            bit+=16;
            $('#rawFront' + key).text(leuchtenFront[key].bytes);
        }

        console.log("Vorne:");
        console.log(leuchtenFront);

        $("#leuchte-vorn-container").loadTemplate(
            "template/leuchten.html",
            leuchtenFront,
            {
                error: function(e) { console.log(e)},
                overwriteCache: true
            }
        );
    }
    function generateHeckOutput() {
        let $textAreaHeckMitWhitespace = $.trim($('#textareaHeck').val());
        let $textAreaHeck = $textAreaHeckMitWhitespace.replace(/\s/g, "");
        let $heckBytes = $textAreaHeck.match(/[\s\S]{1,2}/g) || [];

        let leuchtenHinten = [];
        let bit = 0;
        let zaehler = 0;
        for(let key in leuchtenHeckName) {
            leuchtenHinten[zaehler] = new Leuchte(
                key,
                leuchtenHeckName[key],
                $heckBytes[bit] + "" + $heckBytes[bit+1] + $heckBytes[bit+2] + $heckBytes[bit+3] + $heckBytes[bit+4] + $heckBytes[bit+5] + $heckBytes[bit+6] + $heckBytes[bit+7] + $heckBytes[bit+8] + $heckBytes[bit+9] + $heckBytes[bit+10] + $heckBytes[bit+11] + $heckBytes[bit+12] + $heckBytes[bit+13] + $heckBytes[bit+14] + $heckBytes[bit+15]
            );
            $('#rawHeck' + key).text(leuchtenHinten[zaehler].bytes);
            bit+=16;
            zaehler++;
        }

        console.log("Hinten:");
        console.log(leuchtenHinten);

        $("#leuchte-heck-container").loadTemplate(
            "template/leuchten.html",
            leuchtenHinten,
            {
                error: function(e) { console.log(e); },
                overwriteCache: true
            }
        );
    }
    function generateSonstigesOutput() {
        let $textareaSonstigesMitWhitespace = $.trim($('#textareaSonstiges').val());
        let $textareaSonstiges = $textareaSonstigesMitWhitespace.replace(/\s/g, "");
        let $sonstigesBytes = $textareaSonstiges.match(/[\s\S]{1,2}/g) || [];

        let leuchtenSonstiges = [];
        let bit = 0;
        let zaehler = 0;
        for(let key in leuchtenSonstigesName) {
            leuchtenSonstiges[zaehler] = new Leuchte(
                key,
                leuchtenSonstigesName[key],
                $sonstigesBytes[bit] + "" + $sonstigesBytes[bit+1] + $sonstigesBytes[bit+2] + $sonstigesBytes[bit+3] + $sonstigesBytes[bit+4] + $sonstigesBytes[bit+5] + $sonstigesBytes[bit+6] + $sonstigesBytes[bit+7] + $sonstigesBytes[bit+8] + $sonstigesBytes[bit+9] + $sonstigesBytes[bit+10] + $sonstigesBytes[bit+11] + $sonstigesBytes[bit+12] + $sonstigesBytes[bit+13] + $sonstigesBytes[bit+14] + $sonstigesBytes[bit+15]
            );
            $('#rawSonstige' + key).text(leuchtenSonstiges[zaehler].bytes);
            bit+=16;
            zaehler++;
        }

        console.log("Sonstiges:");
        console.log(leuchtenSonstiges);

        $("#leuchte-sonstiges-container").loadTemplate(
            "template/leuchten.html",
            leuchtenSonstiges,
            {
                error: function(e) { console.log(e); },
                overwriteCache: true
            }
        );
    }
})(jQuery);
