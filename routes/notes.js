const express = require('express')
const fs = require('fs')
const date = require('date-and-time')
const _ = require('lodash')
const router = express.Router();
let file = 'public/data/notes.json';


/**
 * Instance for showing al the notes
 * */
router.get('/', function(req, res, next) {
  fs.readFile(file, 'utf8', function(err, data){
      if(err) throw err;
      let obj = JSON.parse(data);
      // order the notes based on latest add or update
      let sortObj = _.sortBy(obj.notes, [function(o) { return o.timestamp; }]);
      console.log(sortObj);
      res.render('notes/index', { title: 'notes', data: _.reverse(sortObj) });
  });

});

/**
 * Instance for showing the notes create page
 * */
router.get('/create', function(req, res, next) {
    let now = new Date();
    let timeObj = getTime();
    console.log(timeObj);
    res.render('notes/create', { title: 'notes', time: timeObj.time, date: timeObj.date });
});

/**
 * Instance for storing the notes
 * */
router.post('/create', function(req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let timeObj = getTime();
    let obj = {
        notes: []
    };
    let last = 0;
    // Read all data from given json file.
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        // get the last note object
        let last = _.last(obj.notes);
        // declare note id when no object exist
        if(!last) last = 0;
        else last = last.id;
        // Put data from input to given json file
        obj.notes.push({id: (last + 1), title: title, description: description, date: timeObj.date, time: timeObj.time, timestamp: timeObj.now});
        // Write all given data async to json file
        fs.writeFile (file, JSON.stringify(obj, null, 4), function(err) {
                if (err) throw err;
                req.flash('success', 'Your note has been made');
                res.redirect('/~s1131670/P2_NodeJS_Opdracht/70/notes');
            });
    });

});

/**
 * Instance for showing notes detail page
 * */
router.get('/details/:noteId', function(req, res, next) {
    let noteId = req.params.noteId;
    let timeObj = getTime();
    fs.readFile(file, 'utf-8', function(err, data){
       if(err) throw err;
       let obj = JSON.parse(data);
       // find the note object
       obj = _.find(obj.notes, function(o){
            return o.id === parseInt(noteId);
       });
       res.render('notes/details', { data: obj, time: timeObj.time, date: timeObj.date  });
    });

});

/**
 * Instance for updating the note
 * */
router.post('/details/update/:noteId', function(req, res, next) {
    let id = req.params.noteId;
    let title = req.body.title;
    let description = req.body.description;
    let timeObj = getTime();
    fs.readFile(file, 'utf-8', function(err, data){
        if(err) throw err;
        let obj = JSON.parse(data);

        let index = _.findIndex(obj.notes, {id: parseInt(id)});
        // Replace item at index using native splice
        obj.notes.splice(index, 1, {id: (index + 1) , title: title, description: description, date: timeObj.date, time: timeObj.time, timestamp: timeObj.now});

        fs.writeFile (file, JSON.stringify(obj, null, 4), function(err) {
            if (err) throw err;
            req.flash('success', 'Your note has been updated');
            res.redirect('/~s1131670/P2_NodeJS_Opdracht/70/notes');
        });
    });
});

/**
 * Instance for deleting the note
 * */
router.post('/delete/:noteId', function(req, res, next) {
    let noteId = req.params.noteId;

    fs.readFile(file, 'utf-8', function(err, data){
        if(err) throw err;
        let obj = JSON.parse(data);
        let index = _.findIndex(obj.notes, {id: parseInt(noteId)});
        // delete note from object
        obj.notes.splice(index, 1);

        fs.writeFile (file, JSON.stringify(obj, null, 4), function(err) {
            if (err) throw err;
            req.flash('success', 'Congratz! you note has been deleted');
            res.redirect('/~s1131670/P2_NodeJS_Opdracht/70/notes');
        });
    });
});


module.exports = router;
