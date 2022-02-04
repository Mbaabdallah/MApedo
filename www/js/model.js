var db;
var tuple;

function initBD() {
    console.debug('Appel initBD()');

    try {
        if (!window.openDatabase) {
            alert('non supporté');
        } else {
            var nomCourt = 'MaPedoBD';
            var version = '1.0';
            var description = 'Ma Pedo BD de steps';
            var maxSizeInBytes = 1000000;
            db = openDatabase(nomCourt, version, description, maxSizeInBytes);

            creerTableSiNonExiste();
        }
    } catch(e) {
        if (e == 2) {
            alert('version de BD invalide');
        } else {
            alert('Erreur inconnue ' + e);
        }
        return;
    }
}

function creerTableSiNonExiste() {
    console.debug('Appel creerTableSiNonExiste()');

    var sql = "CREATE TABLE IF NOT EXISTS Steps (id INTEGER PRIMARY KEY AUTOINCREMENT, Dat DATE, Km DOUBLE, Heure TEXT, Kcal DOUBLE)";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], afficherTuples, traiterErreur);
            console.debug('executeSql: ' + sql);
        }
    );
}

function insererTuple() {
    console.debug('Appel insererTuple()');
    var now = new Date();
    var yy = now.getFullYear();
    var mm = now.getMonth()+1;
    var jj = now.getDay();
    var Dat = yy + ' / ' + mm  +' / ' + jj;
    var Km = document.getElementById('distance').innerHTML;
    var Heure = document.getElementById('heure').innerHTML;
    var Kcal = document.getElementById('calories').innerHTML;

    var sql = 'INSERT INTO Steps (Dat, Km, Heure, Kcal) VALUES (?, ?, ?, ?)';
   
    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [Dat, Km, Heure, Kcal], afficherTuplesEtInitForm, traiterErreur);
            console.debug('executeSql: ' + sql);
        }
    );
}


function supprimerTuple() {
    console.debug('Appel supprimerTuple()');

    var sql = 'DELETE FROM Steps WHERE Heure == ""';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql);
            console.debug('executeSql: ' + sql);
            
        }
    );

    initForm();
}

function majTuple() {
    console.debug('Appel majTuple()');

    
    
    var Dat = $('#Date').val();
    var Km = $('#Km').val();
    var Heure = $('#Heure').val();
    var Kcal = $('#Kcal').val();
    var id = $("#id").val();

    var sql = 'UPDATE Steps SET Dat=?, Km=?, Heure=?, Kcal=? WHERE id=?';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [Dat, Km, Heure, Kcal, id], afficherTuplesEtInitForm, traiterErreur);
            console.debug('executeSql: ' + sql);
        }
    );
}

function supprimerTable() {
    console.debug('Appel supprimerTable()');

    var sql = 'DROP TABLE Steps';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], afficherTuples, traiterErreur);
        }
    );

    initForm();

    initBD();
}

function initForm() {
    console.debug('Appel initForm()');

    $('#Date').val('');
    $('#Km').val('');
    $('#Heure').val('');
    $('#Kcal').val('');
    $('#id').val('');
}

function afficherTuplesEtInitForm() {
    console.debug('Appel afficherTuplesEtInitForm()');

    initForm();
    afficherTuples()
}

function traiterErreur(transaction, error) {
    console.debug('Appel traiterErreur()');
    console.error('error ' + error.message);

    alert(error.message);
    return true;
}

function afficherTuples() {
    console.debug('Appel afficherTuples()');

    var sql = "SELECT * FROM Steps";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], tuplesRendus, traiterErreur);
        }
    );
}

function tuplesRendus(transaction, resultats) {
    console.debug('Appel tuplesRendus()');

    html = '';
    $('#resultats').html('');

    tuple = resultats.rows;

    if (tuple.length > 0) {
        html = html + '  <ul data-role="listview">';

        for (var i = 0, item = null; i < tuple.length; i++) {
            item = tuple.item(i);

            html = html + '    <li>';
            html = html + '      <h3>' + item['Dat'] + '</h3>';
            html = html + '      <p>Km: ' + item['Km'] + '</p>';
            html = html + '      <p>Heure: ' + item['Heure'] + '</p>';
            html = html + '      <p>Kcal: ' + item['Kcal'] + '</p>';
            html = html + '      <p>Id: ' + item['id'] + '</p>';
            html = html + '      <p>';
            html = html + '        <button type="button" data-icon="arrow-u" onClick="preparerEdition(' + i + ');">edit</button>';
            html = html + '        <button type"button" data-icon="delete" onClick="supprimerTuple(' + item['id'] + ');">delete</button>';
            html = html + '      </p>';
            html = html + '    </li>';
        }

        html = html + '  </ul>';

        $('#resultats').append(html);
        $('#resultats ul').listview();
    }
}

function preparerAjout() {
  $('form').show();
  $('#btnAjouter').addClass('ui-disabled');
  $('#resultats').addClass('ui-disabled');
  $('#btnEnregistrer').on('click', function(){ insererTuple() });
  $('#btnEnregistrer').on('click', function(){ Annuler() });
  $('#Dat').focus();
}

function preparerEdition(i) {
  chargerTuple(i)

  $('form').show();
  $('#btnAjouter').addClass('ui-disabled');
  $('#resultats').addClass('ui-disabled');
  $('#btnEnregistrer').on('click', function(){ majTuple() });
  $('#btnEnregistrer').on('click', function(){ Annuler() });
  $('#Dat').focus();
}

function chargerTuple(i) {
    console.debug('Appel chargerTuple()');

    var item = tuple.item(i);

    $('#Dat').val(item['Dat']);
    $('#Km').val(item['Km']);
    $('#Heure').val(item['Heure']);
    $('#Kcal').val(item['Kcal']);
    $('#id').val(item['id']);
}

function Annuler() {
  $('form').hide();
  $('#btnAjouter').removeClass('ui-disabled');
  $('#resultats').removeClass('ui-disabled');
  $('#btnEnregistrer').off('click');
}

function majContenu(event) {
    console.debug('Appel majContenu()');
    window.applicationCache.swapCache();
}

$(document).ready(function () {
    var el = document.getElementById('id');
    if(el){
        el.addEventListener('majPrete', majContenu, false);
    }



    initBD();
    Annuler();
});
